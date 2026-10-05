#!/usr/bin/env node
// convert.mjs — one entry point: any QC Markdown file (or a folder of them) → HTML page(s), each file
// independently, with the renderer that owns its format:
//   TEST-CASES-{feature}.md      → render-tc-review.mjs   (+ TEST-DATA, Arabic sidecar, review comments)
//                                   → TC-REVIEW-{feature}.html            [mirror of skills 3 / 3b / 3c]
//   TEST-RUN-REPORT-{feature}.md → render-run-report.mjs  (+ BUG-REPORT, .runs/, review comments)
//                                   → TEST-RUN-REPORT-{feature}.html      [mirror of skill 5]
//   BUG-REPORT-{feature}.md      → the run-report page when its TEST-RUN-REPORT sits beside it, else generic
//   everything else (.md)        → render-markdown.mjs → {file}.html      [test-plan.md, TEST-DATA, notes]
//
// Node >= 18, ESM, zero dependencies. Unlike the renderers it wraps, convert WRITES by default
// (that is what a conversion command is for); --dry-run parses and reports only. The markdown is
// read-only in every mode, the HTML is never printed, and a hand-edited page is refused without --force.
//
// Usage:
//   node convert.mjs <file-or-folder> [more…] [--lang en|ar] [--dry-run] [--force] [--strict] [--pretty]
//                    [--only tc|run|md]
// Exit: 0 always, unless --strict: 0 when every page is PASS, 1 when any MISMATCH, 2 when any BLOCKED,
//       3 when nothing was rendered.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs, print } from './render-tc-review.mjs';
import * as TC from './render-tc-review.mjs';
import * as RR from './render-run-report.mjs';
import * as MD from './render-markdown.mjs';

export const TOOL = 'link-qc-md-to-html/convert';
export const SCHEMA_VERSION = '1.0';
const isFile = (p) => { try { return fs.statSync(p).isFile(); } catch { return false; } };
const isDir = (p) => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
const SKIP_RE = /^(REVIEW-COMMENTS-.*|TC-REVIEW-STRINGS-.*\.ar|TC-GENERATION-SUMMARY|automation-inventory)\.md$/i;

export function classify(file) {
  const b = path.basename(file);
  if (/^TEST-CASES-.+\.md$/i.test(b)) return 'tc';
  if (/^TEST-RUN-REPORT-.+\.md$/i.test(b)) return 'run';
  if (/^BUG-REPORT-(.+)\.md$/i.test(b)) {
    const feature = b.match(/^BUG-REPORT-(.+)\.md$/i)[1];
    return isFile(path.join(path.dirname(file), 'TEST-RUN-REPORT-' + feature + '.md')) ? 'run-via-bugs' : 'md';
  }
  return 'md';
}

export function expand(targets) {
  const files = [];
  for (const t of targets) {
    if (isDir(t)) {
      for (const n of fs.readdirSync(t).sort()) { const f = path.join(t, n); if (isFile(f) && /\.md$/i.test(n) && !SKIP_RE.test(n)) files.push(f); }
    } else if (isFile(t)) files.push(t);
    else files.push(t); // reported as NOT_RUN by the renderer
  }
  return [...new Set(files.map((f) => path.resolve(f)))];
}

function runRenderer(kind, file, args, root) {
  const flags = []; if (!args['dry-run']) flags.push('--write'); if (args.force) flags.push('--force'); if (args.pretty) flags.push('--pretty');
  if (kind === 'tc') return { renderer: 'render-tc-review', exit: captured(() => TC.main(['--tc', file, '--lang', args.lang === 'ar' ? 'ar' : 'en', ...flags])) };
  if (kind === 'run') return { renderer: 'render-run-report', exit: captured(() => RR.main(['--report', file, ...flags])) };
  if (kind === 'run-via-bugs') {
    const feature = path.basename(file).match(/^BUG-REPORT-(.+)\.md$/i)[1];
    const report = path.join(path.dirname(file), 'TEST-RUN-REPORT-' + feature + '.md');
    return { renderer: 'render-run-report', note: 'bug report rendered inside the run-report page', exit: captured(() => RR.main(['--report', report, '--bugs', file, ...flags])) };
  }
  return { renderer: 'render-markdown', exit: captured(() => MD.main(['--md', file, '--lang', args.lang === 'ar' ? 'ar' : 'en', ...flags])) };
}
// The wrapped renderers print their payload to stdout; capture it so convert can print one combined payload.
function captured(fn) {
  const chunks = []; const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (s) => { chunks.push(String(s)); return true; };
  let exit = 0; try { exit = fn(); } finally { process.stdout.write = orig; }
  let payload = null; const text = chunks.join('').trim();
  try { payload = JSON.parse(text); } catch { try { payload = JSON.parse(text.split('\n').pop()); } catch { payload = { gate: 'NOT_RUN', gateReason: 'renderer printed no payload' }; } }
  return { exit, payload };
}

export function main(argv) {
  const args = parseArgs(argv);
  const root = process.cwd();
  const targets = args._.length ? args._ : [];
  const out = { tool: TOOL, schema: SCHEMA_VERSION, mode: args['dry-run'] ? 'dry-run' : 'write', lang: args.lang === 'ar' ? 'ar' : 'en', pages: [], summary: { total: 0, pass: 0, mismatch: 0, blocked: 0, notRun: 0 } };
  if (!targets.length) { out.gate = 'NOT_RUN'; out.gateReason = 'give at least one markdown file or a feature folder'; print(out, args); return args.strict ? 3 : 0; }
  const files = expand(targets);
  const only = typeof args.only === 'string' ? args.only : null;
  for (const file of files) {
    const kind = classify(file);
    if (only && !(only === kind || (only === 'run' && kind === 'run-via-bugs'))) continue;
    const r = runRenderer(kind, file, args, root);
    const p = r.exit.payload || {};
    const gate = p.gate || 'NOT_RUN';
    out.pages.push({ source: path.relative(root, file), renderer: r.renderer, note: r.note, gate, gateReason: p.gateReason || '', writes: (p.writes || []).map((w) => w.file).filter(Boolean), warnings: (p.warnings || []).map((w) => w.kind), errors: (p.errors || []).map((e) => e.kind || e.detail), mismatches: (p.mismatches || []).length, refused: p.refused || null });
    out.summary.total++;
    out.summary[gate === 'PASS' ? 'pass' : gate === 'MISMATCH' ? 'mismatch' : gate === 'BLOCKED' ? 'blocked' : 'notRun']++;
  }
  out.gate = out.summary.total === 0 ? 'NOT_RUN' : out.summary.blocked ? 'BLOCKED' : out.summary.mismatch ? 'MISMATCH' : out.summary.notRun === out.summary.total ? 'NOT_RUN' : 'PASS';
  print(out, args);
  if (!args.strict) return 0;
  return { PASS: 0, MISMATCH: 1, BLOCKED: 2, NOT_RUN: 3 }[out.gate] ?? 3;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
