#!/usr/bin/env node
// sync-qc-skills.mjs — pull the Spec Kit QC kit's three skills (and the /sync-skills command
// plus this script) from the canonical repo into the current project's .claude/ folder.
//
// Zero dependencies, Node >= 18 (global fetch). Prints ONE JSON payload on stdout.
//
//   node .claude/scripts/sync-qc-skills.mjs --check  [--only <skill>]… [--branch main] [--tools] [--pretty]
//   node .claude/scripts/sync-qc-skills.mjs --apply  [--only <skill>]… [--branch main] [--tools] [--pretty]
//   node .claude/scripts/sync-qc-skills.mjs --apply --replace --yes   # delete our skill folders, download fresh
//
// --check   plan only (read-only). Compares remote git blob SHAs with local files — no download needed.
// --apply   write new / changed files; never deletes anything.
// --replace with --yes: delete each of OUR skill folders and put the fresh copy in its place (staged first,
//           restored on failure). Local-only files inside those folders disappear — that is the point.
// --tools   also install playwright-cli (+ chromium, .gitignore line) and Pillow + numpy when Python exists.
// Private repo: set GITHUB_TOKEN or GH_TOKEN (a fine-grained token with Contents: read is enough).

import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync, appendFileSync } from 'node:fs';
import { dirname, join, posix, resolve, sep } from 'node:path';

export const SOURCE_REPO = 'AhmedZaher1233/spec-kit-qc';
export const SOURCE_URL = `https://github.com/${SOURCE_REPO}`;
export const DEFAULT_BRANCH = 'main';
export const SKILLS = [
  'link-qc-5-test-run-automation',
  'link-qc-6-ui-testing',
  'link-qc-md-to-html',
];
export const SKILLS_DIR = '.claude/skills';
export const SYNC_COMMAND = '.claude/commands/sync-skills.md';
export const SELF = '.claude/scripts/sync-qc-skills.mjs';
export const PLAYWRIGHT_CLI_PACKAGE = '@playwright/cli';
export const PLAYWRIGHT_CLI_IGNORE = '.playwright-cli/';
export const PYTHON_PACKAGES = ['pillow', 'numpy'];

// ---------- args ----------
function parseArgs(argv) {
  const a = { mode: 'check', only: [], branch: DEFAULT_BRANCH, replace: false, yes: false, tools: false, pretty: false, root: process.cwd() };
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--check') a.mode = 'check';
    else if (v === '--apply') a.mode = 'apply';
    else if (v === '--replace') a.replace = true;
    else if (v === '--yes') a.yes = true;
    else if (v === '--tools') a.tools = true;
    else if (v === '--pretty') a.pretty = true;
    else if (v === '--only') a.only.push(argv[++i]);
    else if (v === '--branch') a.branch = argv[++i];
    else if (v === '--root') a.root = resolve(argv[++i]);
    else throw new Error(`unknown argument: ${v}`);
  }
  if (!a.branch) throw new Error('--branch needs a value');
  for (const s of a.only) if (!SKILLS.includes(s)) throw new Error(`--only ${s}: not a preset skill (${SKILLS.join(', ')})`);
  return a;
}

// ---------- helpers ----------
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
function headers(extra = {}) {
  const h = { 'User-Agent': 'spec-kit-qc-sync', ...extra };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}
export function gitBlobSha(buf) {
  return createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
}
function toPosix(p) { return p.split(sep).join('/'); }
function listFiles(dir, base = dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p, base));
    else out.push(toPosix(p.slice(base.length + 1)));
  }
  return out;
}
function isCanonicalRepo(root) {
  const preset = join(root, 'preset.yml');
  if (!existsSync(preset)) return false;
  return /^\s*id:\s*["']?qc["']?\s*$/m.test(readFileSync(preset, 'utf8'));
}
function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8', timeout: opts.timeout ?? 600_000, shell: true }).trim();
}
function has(cmd) { try { run(cmd); return true; } catch { return false; } }

// ---------- remote ----------
async function fetchTree(branch) {
  const url = `https://api.github.com/repos/${SOURCE_REPO}/git/trees/${encodeURIComponent(branch)}?recursive=1`;
  const res = await fetch(url, { headers: headers({ Accept: 'application/vnd.github+json' }) });
  if (res.status === 404) throw new Error(`${SOURCE_URL} (${branch}) not found — the repo is private (set GITHUB_TOKEN / GH_TOKEN) or the branch does not exist`);
  if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') throw new Error('GitHub API rate limit reached — set GITHUB_TOKEN / GH_TOKEN or retry later');
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
  const json = await res.json();
  return { blobs: json.tree.filter((t) => t.type === 'blob'), truncated: Boolean(json.truncated) };
}
async function fetchRaw(branch, path) {
  const url = `https://raw.githubusercontent.com/${SOURCE_REPO}/${encodeURIComponent(branch)}/${path.split('/').map(encodeURIComponent).join('/')}`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`download failed ${res.status}: ${path}`);
  return Buffer.from(await res.arrayBuffer());
}

// ---------- plan (pure) ----------
export function plan({ blobs, root, wanted }) {
  const owned = (p) => wanted.some((s) => p.startsWith(`${SKILLS_DIR}/${s}/`)) || p === SYNC_COMMAND || p === SELF;
  const remote = blobs.filter((b) => owned(b.path));
  const skills = {};
  for (const s of wanted) skills[s] = { files: 0, new: 0, updated: 0, current: 0, localOnly: [], present: existsSync(join(root, SKILLS_DIR, s)) };
  const files = [];
  for (const b of remote) {
    const local = join(root, b.path);
    let state = 'new';
    if (existsSync(local)) state = gitBlobSha(readFileSync(local)) === b.sha ? 'current' : 'updated';
    files.push({ path: b.path, sha: b.sha, state });
    const s = wanted.find((w) => b.path.startsWith(`${SKILLS_DIR}/${w}/`));
    if (s) { skills[s].files++; skills[s][state]++; }
  }
  for (const s of wanted) {
    const remotePaths = new Set(remote.map((b) => b.path));
    for (const f of listFiles(join(root, SKILLS_DIR, s))) {
      const p = `${SKILLS_DIR}/${s}/${f}`;
      if (!remotePaths.has(p)) skills[s].localOnly.push(p);
    }
  }
  const missingRemote = wanted.filter((s) => skills[s].files === 0);
  return { files, skills, missingRemote, selfChanged: files.some((f) => (f.path === SELF || f.path === SYNC_COMMAND) && f.state !== 'current') };
}

// ---------- apply ----------
async function writeFiles(root, branch, files) {
  const written = [];
  for (const f of files) {
    if (f.state === 'current') continue;
    const buf = await fetchRaw(branch, f.path);
    if (gitBlobSha(buf) !== f.sha) throw new Error(`downloaded content does not match the tree SHA: ${f.path} (branch moved mid-run — rerun)`);
    const target = join(root, f.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, buf);
    written.push(f.path);
  }
  return written;
}
async function replaceSkill(root, branch, skill, files) {
  const dir = join(root, SKILLS_DIR, skill);
  const staging = join(root, SKILLS_DIR, `.sync-staging-${skill}`);
  const backup = join(root, SKILLS_DIR, `.sync-backup-${skill}`);
  rmSync(staging, { recursive: true, force: true });
  const prefix = `${SKILLS_DIR}/${skill}/`;
  for (const f of files.filter((x) => x.path.startsWith(prefix))) {
    const buf = await fetchRaw(branch, f.path);
    if (gitBlobSha(buf) !== f.sha) throw new Error(`downloaded content does not match the tree SHA: ${f.path}`);
    const target = join(staging, f.path.slice(prefix.length));
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, buf);
  }
  rmSync(backup, { recursive: true, force: true });
  const hadOld = existsSync(dir);
  try {
    if (hadOld) renameSync(dir, backup);
    renameSync(staging, dir);
    rmSync(backup, { recursive: true, force: true });
    return hadOld ? 'replaced' : 'installed';
  } catch (e) {
    rmSync(dir, { recursive: true, force: true });
    if (hadOld && existsSync(backup)) renameSync(backup, dir);
    rmSync(staging, { recursive: true, force: true });
    throw new Error(`replace-failed ${skill}: ${e.message} (old folder restored)`);
  }
}

// ---------- tools ----------
function toolsPlan(root) {
  const t = { playwrightCli: 'not installed', browser: '—', gitignore: '—', python: 'absent', planned: [] };
  try { t.playwrightCli = run('playwright-cli --version', { timeout: 30_000 }) || 'installed'; } catch { t.planned.push(`npm install -g ${PLAYWRIGHT_CLI_PACKAGE}@latest`); }
  t.planned.push('playwright-cli install-browser');
  const gi = join(root, '.gitignore');
  const giText = existsSync(gi) ? readFileSync(gi, 'utf8') : '';
  t.gitignore = giText.split(/\r?\n/).includes(PLAYWRIGHT_CLI_IGNORE) ? 'ok' : 'missing';
  if (t.gitignore === 'missing') t.planned.push(`append ${PLAYWRIGHT_CLI_IGNORE} to .gitignore`);
  const py = ['python', 'python3', 'py -3'].find((c) => has(`${c} --version`));
  if (py) {
    t.python = has(`${py} -c "import PIL, numpy"`) ? 'ready' : 'packages missing';
    if (t.python === 'packages missing') t.planned.push(`${py} -m pip install ${PYTHON_PACKAGES.join(' ')}`);
    t.pythonCmd = py;
  }
  return t;
}
function toolsApply(root, t) {
  const done = [];
  const failed = [];
  const step = (label, fn) => { try { fn(); done.push(label); } catch (e) { failed.push({ step: label, error: String(e.message || e).split('\n')[0] }); } };
  if (t.playwrightCli === 'not installed') step(`npm install -g ${PLAYWRIGHT_CLI_PACKAGE}@latest`, () => run(`npm install -g ${PLAYWRIGHT_CLI_PACKAGE}@latest`));
  step('playwright-cli install-browser', () => run('playwright-cli install-browser'));
  if (t.gitignore === 'missing') step('gitignore', () => appendFileSync(join(root, '.gitignore'), `${existsSync(join(root, '.gitignore')) && !readFileSync(join(root, '.gitignore'), 'utf8').endsWith('\n') ? '\n' : ''}${PLAYWRIGHT_CLI_IGNORE}\n`));
  if (t.python === 'packages missing') step(`pip install ${PYTHON_PACKAGES.join(' ')}`, () => run(`${t.pythonCmd} -m pip install ${PYTHON_PACKAGES.join(' ')}`));
  return { done, failed };
}

// ---------- main ----------
async function main() {
  const a = parseArgs(process.argv.slice(2));
  const out = { tool: 'sync-qc-skills', schema: '1.0', source: `${SOURCE_URL} (${a.branch})`, mode: a.mode, replace: a.replace, root: toPosix(a.root) };
  const emit = (o) => { process.stdout.write(JSON.stringify(o, null, a.pretty ? 2 : 0) + '\n'); };
  if (isCanonicalRepo(a.root)) {
    emit({ ...out, status: 'refused', summary: 'this folder is the canonical preset repo — use git pull here' });
    process.exitCode = 2; return;
  }
  if (a.replace && a.mode === 'apply' && !a.yes) {
    emit({ ...out, status: 'refused', summary: '--replace needs --yes (the user must confirm the delete + re-download)' });
    process.exitCode = 2; return;
  }
  const wanted = a.only.length ? a.only : SKILLS;
  let tree;
  try { tree = await fetchTree(a.branch); } catch (e) {
    emit({ ...out, status: 'error', summary: `source unreachable — local skills unchanged: ${e.message}` });
    process.exitCode = 1; return;
  }
  const p = plan({ blobs: tree.blobs, root: a.root, wanted });
  out.truncated = tree.truncated;
  out.skills = p.skills;
  out.missingRemote = p.missingRemote;
  out.command = p.files.find((f) => f.path === SYNC_COMMAND)?.state ?? 'absent-remote';
  out.self = p.files.find((f) => f.path === SELF)?.state ?? 'absent-remote';
  out.counts = { files: p.files.length, new: p.files.filter((f) => f.state === 'new').length, updated: p.files.filter((f) => f.state === 'updated').length, current: p.files.filter((f) => f.state === 'current').length };
  out.replacePlan = {
    needsConfirmation: wanted.some((s) => p.skills[s].present),
    deleteAndRedownload: wanted.filter((s) => p.skills[s].present),
    lost: wanted.flatMap((s) => p.skills[s].localOnly),
    confirmText: `This sync DELETES the QC skill folders ${wanted.filter((s) => p.skills[s].present).join(', ') || '(none present)'} and downloads fresh copies from ${SOURCE_URL} (${a.branch}), together with ${SYNC_COMMAND}. Any enhancement made locally to those skills is removed and replaced with the new version. Other skills, commands, settings and files are never touched. Proceed?`,
  };
  if (a.tools) out.tools = toolsPlan(a.root);

  if (a.mode === 'check') {
    out.status = 'planned';
    out.summary = `${out.counts.new} new · ${out.counts.updated} updated · ${out.counts.current} current across ${wanted.length} skill(s)` + (p.missingRemote.length ? ` · missing in source: ${p.missingRemote.join(', ')}` : '');
    emit(out);
    return;
  }

  const applied = {};
  try {
    if (a.replace) {
      for (const s of wanted) if (p.skills[s].files) applied[s] = await replaceSkill(a.root, a.branch, s, p.files);
      const rest = p.files.filter((f) => f.path === SYNC_COMMAND || f.path === SELF);
      out.written = await writeFiles(a.root, a.branch, rest);
    } else {
      out.written = await writeFiles(a.root, a.branch, p.files);
      for (const s of wanted) applied[s] = p.skills[s].files === 0 ? 'missing-in-source' : p.skills[s].present ? (p.skills[s].new + p.skills[s].updated ? 'updated' : 'current') : 'installed';
    }
  } catch (e) {
    out.status = 'error';
    out.summary = e.message;
    out.applied = applied;
    emit(out);
    process.exitCode = 1; return;
  }
  out.applied = applied;
  if (a.tools) out.toolsApplied = toolsApply(a.root, out.tools);
  out.reloadRequired = (out.written?.length ?? 0) > 0 || Object.values(applied).some((v) => v === 'replaced' || v === 'installed');
  out.selfUpdated = p.selfChanged;
  out.status = 'applied';
  out.summary = `${a.replace ? 'replaced' : 'updated'} ${wanted.length} skill(s): ${Object.entries(applied).map(([k, v]) => `${k.replace(/^link-qc-/, '')}=${v}`).join(' · ')}` + (p.selfChanged ? ' · sync command/script updated — run /sync-skills once more to use the new version' : '');
  emit(out);
}

if (toPosix(process.argv[1] ?? '').endsWith('sync-qc-skills.mjs')) {
  main().catch((e) => { process.stdout.write(JSON.stringify({ tool: 'sync-qc-skills', status: 'error', summary: String(e.message || e) }) + '\n'); process.exitCode = 1; });
}
