#!/usr/bin/env node
// render-markdown.mjs — generic renderer for any QC Markdown document that has no dedicated renderer
// (test-plan.md, TEST-DATA-{feature}.md, a BUG-REPORT without its run report, qc notes…).
//   {file}.md → {file}.html, inside assets/report-shell.template.html — the one general report page
//   shared byte-for-byte with skills 3c and 5. The shell kit (renderShell, comments, strings) is
//   imported from the sibling render-tc-review.mjs so the chrome, theme toggle, reviewer-comment
//   boxes and screenshot viewer behave exactly like the test-case and run-report pages.
//
// Node >= 18, ESM, zero dependencies. DEFAULT MODE IS DRY-RUN: parse, compute, print the JSON payload,
// write nothing. Writing happens only behind --write; the HTML is never printed to stdout. The
// markdown source is read-only in every mode.
//
// Standing rules (same as the two dedicated renderers):
//   1. never invent a number — this renderer computes nothing beyond what the document states;
//   2. a password-shaped literal in the source is BLOCKED, never rendered;
//   3. the page carries a provenance comment (source sha256 + self-hash) so a hand-edited page is
//      detected and refused without --force;
//   4. HTML comments in the markdown (template guidance) are never rendered.
//
// Usage:
//   node render-markdown.mjs --md <file.md> [--out <path>] [--kind <slug>] [--title <text>] [--eyebrow <text>]
//        [--lang en|ar] [--comments <path>] [--write] [--force] [--strict] [--pretty]
// Exit: 0 always, unless --strict: PASS 0 · MISMATCH 1 · BLOCKED 2 · NOT_RUN 3.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs, print, sha256, escapeHtml, renderShell, commentsModel, pageState as tcPageState, SHELL_PATH } from './render-tc-review.mjs';

export const SCHEMA_VERSION = '1.0';
export const TOOL = 'render-markdown';
const here = path.dirname(fileURLToPath(import.meta.url));
const isFile = (p) => { try { return fs.statSync(p).isFile(); } catch { return false; } };
const readText = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n?/g, '\n');
const DASH = '—';
const SECRET_RE = /\b(password|passcode|secret|token|pat|api[- ]?key)\b\s*(?:[:=]|is)\s*["'`]?[^\s"'`]{3,}/i;
const BLANK = '0'.repeat(64);
const PROV_RE = /<!-- render-markdown v[^ ]+ · kind=([a-z0-9-]+) · source=([0-9a-f]{64})(?: · comments=([0-9a-f]{64}|none))? · lang=(\w+) · page=([0-9a-f]{64}) -->/;

/* ============================================================================================
 * Document kinds — eyebrow and status heuristics per well-known QC file.
 * ========================================================================================== */
export const KINDS = {
  'test-plan': { eyebrow: 'Test plan · the single QC review point', statusKeys: ['Status'] },
  'test-data': { eyebrow: 'Test data · environments, accounts, data items', statusKeys: ['Environment'] },
  'bug-report': { eyebrow: 'Bug report · defects and retests', statusKeys: ['Bugs'] },
  'qc-document': { eyebrow: 'QC document', statusKeys: ['Status'] },
};
export function detectKind(file) {
  const b = path.basename(file);
  if (/^test-plan\.md$/i.test(b)) return 'test-plan';
  if (/^TEST-DATA-.+\.md$/i.test(b)) return 'test-data';
  if (/^BUG-REPORT-.+\.md$/i.test(b)) return 'bug-report';
  return 'qc-document';
}

/* ============================================================================================
 * Markdown → HTML. Small, deterministic, CommonMark-ish subset: ATX headings, paragraphs,
 * fenced code, blockquotes, bullet / ordered lists (nested by 2+ spaces), pipe tables, hr,
 * HTML comments (dropped), inline code / bold / italic / links / images.
 * ========================================================================================== */
function inline(s) {
  const codes = [];
  let t = s.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
  t = escapeHtml(t);
  t = t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, src) => '<a class="shot" href="' + src + '" target="_blank" rel="noopener"><img src="' + src + '" alt="' + alt + '" loading="lazy"></a>');
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, txt, href) => '<a href="' + href + '">' + txt + '</a>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  t = t.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,;:]|$)/g, '$1<i>$2</i>');
  t = t.replace(/\u0000(\d+)\u0000/g, (m, i) => '<code class="ltr">' + escapeHtml(codes[Number(i)]) + '</code>');
  return t;
}
function stripComments(md) { return md.replace(/<!--[\s\S]*?-->/g, ''); }
function isTableLine(l) { return /^\s*\|.*\|\s*$/.test(l); }
function isSepLine(l) { return /^\s*\|(\s*:?-+:?\s*\|)+\s*$/.test(l); }
function cells(l) { return l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim()); }

export function markdownToHtml(md) {
  const lines = stripComments(md).split('\n');
  const out = []; const toc = [];
  let i = 0; let para = [];
  const flushPara = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const listBlock = (start) => {
    // returns [html, nextIndex]; handles nested lists by indentation
    const items = []; let j = start; let indent = null; let ordered = null;
    while (j < lines.length) {
      const l = lines[j]; const m = l.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
      if (!m) { if (/^\s*$/.test(l) && j + 1 < lines.length && /^(\s*)([-*+]|\d+[.)])\s+/.test(lines[j + 1]) && (lines[j + 1].match(/^(\s*)/)[1].length >= (indent ?? 0))) { j++; continue; } break; }
      const ind = m[1].length;
      if (indent === null) { indent = ind; ordered = /\d/.test(m[2]); }
      if (ind < indent) break;
      if (ind > indent) { const [h, nj] = listBlock(j); items[items.length - 1].sub += h; j = nj; continue; }
      items.push({ text: m[3], sub: '' }); j++;
      // continuation lines (indented, not a new item)
      while (j < lines.length && /^\s+\S/.test(lines[j]) && !/^\s*([-*+]|\d+[.)])\s+/.test(lines[j]) && !isTableLine(lines[j])) { items[items.length - 1].text += ' ' + lines[j].trim(); j++; }
    }
    const tag = ordered ? 'ol' : 'ul';
    return ['<' + tag + '>' + items.map((it) => '<li>' + inline(it.text) + it.sub + '</li>').join('') + '</' + tag + '>', j];
  };
  while (i < lines.length) {
    const l = lines[i];
    if (/^\s*$/.test(l)) { flushPara(); i++; continue; }
    const h = l.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (h) { flushPara(); const lvl = h[1].length; const text = h[2]; const id = 'h-' + toc.length + '-' + text.toLowerCase().replace(/[^a-z0-9؀-ۿ]+/g, '-').replace(/^-|-$/g, '').slice(0, 60); toc.push({ lvl, text, id });
      if (lvl === 1) { i++; continue; } // the H1 is the page title, rendered by the shell
      out.push(lvl === 2 ? '<div class="sec-head"><h2 id="' + id + '">' + inline(text) + '</h2></div>' : '<h' + lvl + ' id="' + id + '">' + inline(text) + '</h' + lvl + '>'); i++; continue; }
    if (/^\s*(```|~~~)/.test(l)) { flushPara(); const fence = l.trim().slice(0, 3); const buf = []; i++; while (i < lines.length && !lines[i].trim().startsWith(fence)) { buf.push(lines[i]); i++; } i++; out.push('<pre class="ltr"><code>' + escapeHtml(buf.join('\n')) + '</code></pre>'); continue; }
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l)) { flushPara(); out.push('<hr>'); i++; continue; }
    if (/^\s*>/.test(l)) { flushPara(); const buf = []; while (i < lines.length && /^\s*>/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, '')); i++; } out.push('<blockquote class="note">' + inline(buf.join(' ')) + '</blockquote>'); continue; }
    if (isTableLine(l) && i + 1 < lines.length && isSepLine(lines[i + 1])) {
      flushPara(); const head = cells(l); i += 2; const rows = [];
      while (i < lines.length && isTableLine(lines[i]) && !isSepLine(lines[i])) { rows.push(cells(lines[i])); i++; }
      let t = '<div class="tablewrap"><table><thead><tr>' + head.map((c) => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>';
      for (const r of rows) t += '<tr>' + head.map((_, k) => '<td>' + inline(r[k] === undefined || r[k] === '' ? DASH : r[k]) + '</td>').join('') + '</tr>';
      if (!rows.length) t += '<tr><td colspan="' + head.length + '" class="caption">' + DASH + '</td></tr>';
      out.push(t + '</tbody></table></div>'); continue;
    }
    if (/^\s*([-*+]|\d+[.)])\s+/.test(l)) { flushPara(); const [html, nj] = listBlock(i); out.push(html); i = nj; continue; }
    para.push(l.trim()); i++;
  }
  flushPara();
  return { html: out.join('\n'), toc };
}

/* ============================================================================================
 * Header lines `**Key:** value` / `**Key**: value` before the first `##` → meta items + title.
 * ========================================================================================== */
export function parseHeader(md) {
  const lines = stripComments(md).split('\n');
  let title = ''; const meta = []; let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^## /.test(l)) { bodyStart = i; break; }
    const t = l.match(/^#\s+(.*)$/); if (t && !title) { title = t[1].trim(); continue; }
    const m = l.match(/^\*\*([^*]+?)(?::\*\*|\*\*:)\s*(.*)$/); if (m) meta.push({ key: m[1].trim(), value: m[2].trim() });
    bodyStart = i + 1;
  }
  return { title, meta, bodyStart };
}
function statusBanner(meta, kind) {
  const keys = (KINDS[kind] || KINDS['qc-document']).statusKeys;
  for (const k of keys) {
    const m = meta.find((x) => x.key.toLowerCase() === k.toLowerCase());
    if (!m) continue;
    const v = m.value; const up = v.toUpperCase();
    let cls = 'banner';
    if (/APPROVED|^GREEN|GO\b(?!-)/.test(up) && !/NO-GO|PENDING/.test(up)) cls = 'banner ok';
    else if (/PENDING|NOT CHECKED|DRAFT|UNKNOWN/.test(up)) cls = 'banner warn';
    else if (/BLOCKED|NO-GO|FAIL/.test(up)) cls = 'banner bad';
    return { cls, html: '<b>' + escapeHtml(m.key) + ':</b> ' + inline(v) };
  }
  return null;
}

export function selfHash(html) { return sha256(html.replace(PROV_RE, (m) => m.replace(/page=[0-9a-f]{64}/, 'page=' + BLANK))); }
export function pageState(existingHtml) {
  const m = existingHtml.match(PROV_RE);
  if (!m) { const other = tcPageState(existingHtml); return { provenance: !!other.provenance, handEdited: false, foreign: !!other.provenance }; }
  return { provenance: true, handEdited: selfHash(existingHtml) !== m[5], foreign: false };
}

export function render({ mdPath, kind = null, title = null, eyebrow = null, lang = 'en', commentsPath = null, root = process.cwd(), shell } = {}) {
  const payload = { tool: TOOL, schema: SCHEMA_VERSION, gate: 'PASS', gateReason: '', input: { md: mdPath ? path.relative(root, mdPath) : null }, kind: null, counts: {}, warnings: [], errors: [], writes: [], readOnly: true };
  if (!mdPath || !isFile(mdPath)) { payload.gate = 'NOT_RUN'; payload.gateReason = mdPath ? 'file not found: ' + mdPath : 'no --md given'; return { payload, html: null }; }
  const md = readText(mdPath);
  const k = kind || detectKind(mdPath); payload.kind = k;
  const K = KINDS[k] || KINDS['qc-document'];
  const { title: docTitle, meta } = parseHeader(md);
  const { html: body, toc } = markdownToHtml(md);
  payload.counts = { headings: toc.length, metaLines: meta.length, tables: (body.match(/<table>/g) || []).length, bytes: Buffer.byteLength(md, 'utf8') };
  const secretLine = md.split('\n').findIndex((l) => SECRET_RE.test(l));
  if (secretLine >= 0) { payload.gate = 'BLOCKED'; payload.gateReason = 'password-shaped literal at line ' + (secretLine + 1) + ' — remove it from the markdown'; payload.errors.push({ kind: 'secret-literal', line: secretLine + 1 }); return { payload, html: null }; }
  const leftovers = [...new Set((md.match(/\{\{[^}]*\}\}|\[PENDING\]|\{YYYY-MM-DD\}/g) || []))];
  if (leftovers.length) payload.warnings.push({ kind: 'placeholders', detail: leftovers.slice(0, 8).join(' ') + (leftovers.length > 8 ? ' …' : '') });
  const base = path.basename(mdPath, '.md');
  const page = base + '.html';
  const sourceRev = sha256(md).slice(0, 12);
  const cp = commentsPath || path.join(path.dirname(mdPath), 'REVIEW-COMMENTS-' + base + '.md');
  const commentsText = isFile(cp) ? readText(cp) : null;
  const known = new Map(toc.filter((h) => h.lvl >= 2).map((h) => [h.text, 'section']));
  const cm = commentsModel({ text: commentsText, file: path.relative(root, cp), page, sourceRev, known });
  payload.warnings.push(...cm.warnings); payload.errors.push(...cm.errors);
  if (cm.errors.length) { payload.gate = 'BLOCKED'; payload.gateReason = cm.errors[0].detail; return { payload, html: null }; }
  payload.comments = { file: cm.file, open: cm.open, handled: cm.handled, stale: cm.stale };
  const banner = statusBanner(meta, k);
  const metaItems = meta.slice(0, 12).map((m) => ({ label: m.key, html: inline(m.value) }));
  const tocHtml = toc.filter((h) => h.lvl === 2).length > 2 ? '<div class="item-card"><p class="item-meta">' + toc.filter((h) => h.lvl === 2).map((h) => '<a href="#' + h.id + '">' + inline(h.text) + '</a>').join(' · ') + '</p></div>\n' : '';
  const d = { lang, dir: lang === 'ar' ? 'rtl' : 'ltr', pageKind: k, pageTitle: (title || docTitle || base), eyebrow: eyebrow || K.eyebrow, title: title || docTitle || base, sub: '', meta: metaItems,
    banners: banner ? [banner] : [], tiles: [], body: tocHtml + body, footer: 'Rendered from <code class="ltr">' + escapeHtml(path.basename(mdPath)) + '</code> by link-qc-md-to-html — the markdown is the source of truth; edit it and re-render, never this page.',
    cm, feature: base, page, source: path.basename(mdPath), sourceRev, commentsFile: 'REVIEW-COMMENTS-' + base + '.md' };
  const shellTpl = shell ?? readText(SHELL_PATH);
  let html = renderShell(shellTpl, d);
  const prov = '<!-- render-markdown v' + SCHEMA_VERSION + ' · kind=' + k + ' · source=' + sha256(md) + ' · comments=' + (commentsText === null ? 'none' : sha256(commentsText)) + ' · lang=' + lang + ' · page=' + BLANK + ' -->';
  html = html.replace(/^(<!DOCTYPE html>\n?)/i, '$1' + prov + '\n');
  html = html.replace('page=' + BLANK, 'page=' + selfHash(html));
  const stray = [...new Set((html.match(/\{\{[^}]*\}\}/g) || []))];
  if (stray.length) { payload.gate = 'MISMATCH'; payload.gateReason = 'unfilled shell placeholders: ' + stray.join(' '); payload.warnings.push({ kind: 'shell-placeholders', detail: stray.join(' ') }); }
  if (payload.gate === 'PASS') payload.gateReason = toc.length + ' heading(s), ' + payload.counts.tables + ' table(s)';
  return { payload, html, page, dir: path.dirname(mdPath) };
}

export function main(argv) {
  const args = parseArgs(argv);
  const root = process.cwd();
  const lang = args.lang === 'ar' ? 'ar' : 'en';
  const mdPath = typeof args.md === 'string' ? path.resolve(root, args.md) : null;
  const r = render({ mdPath, kind: typeof args.kind === 'string' ? args.kind : null, title: typeof args.title === 'string' ? args.title : null, eyebrow: typeof args.eyebrow === 'string' ? args.eyebrow : null, lang, commentsPath: typeof args.comments === 'string' ? path.resolve(root, args.comments) : null, root });
  const p = r.payload;
  if (args.write && r.html && p.gate !== 'BLOCKED') {
    const out = typeof args.out === 'string' ? path.resolve(root, args.out) : path.join(r.dir, r.page);
    if (isFile(out)) {
      const st = pageState(readText(out));
      if (st.provenance && st.handEdited && !args.force) { p.gate = 'BLOCKED'; p.gateReason = 'existing page ' + path.relative(root, out) + ' was edited by hand after it was rendered — re-run with --force to overwrite it'; p.refused = { file: path.relative(root, out), reason: 'hand-edited' }; }
      else if (st.foreign && !args.force) { p.gate = 'BLOCKED'; p.gateReason = 'existing page ' + path.relative(root, out) + ' was rendered by another renderer — use that renderer, or --force to replace it'; p.refused = { file: path.relative(root, out), reason: 'foreign-renderer' }; }
      else if (!st.provenance) p.warnings.push({ kind: 'legacy-page-replaced', detail: path.relative(root, out) + ' had no provenance comment — replaced' });
    }
    if (p.gate !== 'BLOCKED') { fs.writeFileSync(out, r.html, 'utf8'); p.readOnly = false; p.writes.push({ file: path.relative(root, out), kind: 'html', bytes: Buffer.byteLength(r.html, 'utf8') }); }
  } else if (args.write && p.gate === 'BLOCKED') p.writes.push({ file: null, kind: 'html', skipped: 'gate BLOCKED — nothing written' });
  print(p, args);
  return exitFor(p.gate, args);
}
function exitFor(gate, args) { if (!args.strict) return 0; return { PASS: 0, MISMATCH: 1, BLOCKED: 2, NOT_RUN: 3 }[gate] ?? 3; }

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
