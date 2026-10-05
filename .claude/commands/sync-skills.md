---
description: Pull the Spec Kit qc preset's four QC skills (link-qc-3c-validate-manual-test-cases-cli, link-qc-5-test-run-automation, link-qc-6-ui-testing, link-qc-md-to-html) and this command from the canonical GitHub repo AhmedZaher1233/spec-kit-qc into the current project's .claude/, and — only with --tools — install playwright-cli + its browser for skill 3c and Pillow + numpy for link-qc-6-ui-testing (when Python exists). Use in ANY project. Args: [skill names…] [--dry-run] [--branch <name>] [--tools]. By default it DELETES our four skill folders and downloads them fresh — only after the user confirms; other skills and files are never deleted.
argument-hint: "[link-qc-3c-validate-manual-test-cases-cli link-qc-5-test-run-automation link-qc-6-ui-testing link-qc-md-to-html] [--dry-run] [--branch main] [--tools]"
allowed-tools: Bash(node *sync-qc-skills.mjs*), Bash(curl *), Bash(mkdir *), Read, Glob, Grep
---

# /sync-skills — update the QC skills in this project from the preset repo

Source of truth: `https://github.com/AhmedZaher1233/spec-kit-qc` (branch `main` unless `--branch` is
given). It owns exactly four skill folders under `.claude/skills/` — the retained QC skills of the
Spec Kit qc preset, already **trimmed** (policy lives in the constitution's Quality Control article,
the skills hold tool mechanics) — plus this command and the sync script. Nothing else in the project
is ever touched: other skills, other commands, `.mcp.json`, `.gitignore` (except the one
`.playwright-cli/` line with `--tools`), `Testing/`, `specs/`, `.specify/` and settings stay as they are.
The preset's templates and commands (`templates/`, `commands/`, `preset.yml`) are not synced by this
command — they are updated through Spec Kit (`specify preset add --dev <path>` / `specify preset list`).

**The only implementation is** `.claude/scripts/sync-qc-skills.mjs` (zero dependencies, Node ≥ 18) —
this command is a thin wrapper around it. Never re-implement the sync in prose.

Arguments: `$ARGUMENTS`
- No skill names → all four skills + this command + the script.
- Skill folder names → `--only <name>` for each.
- `--dry-run` → run the script with `--check` (read-only; compares remote git blob SHAs with the local files, nothing downloaded).
- `--branch <name>` → passed through.
- `--tools` → also install the optional tools: playwright-cli (+ chromium browser + the `.playwright-cli/` gitignore line) for skill 3c, and Pillow + numpy for link-qc-6-ui-testing when a Python interpreter already exists. Without it nothing is installed.

Private repository: the script sends `GITHUB_TOKEN` / `GH_TOKEN` when set (a fine-grained token with
*Contents: read* is enough). A `status: error` with "not found — the repo is private" means the token
is missing; relay that and stop.

## Steps

1. **Locate the script.** If `.claude/scripts/sync-qc-skills.mjs` is missing, bootstrap it once from
   the project root:

   ```bash
   mkdir -p .claude/scripts
   curl -fsSL -o .claude/scripts/sync-qc-skills.mjs \
     "https://raw.githubusercontent.com/AhmedZaher1233/spec-kit-qc/main/.claude/scripts/sync-qc-skills.mjs"
   ```

   (for a private repo add `-H "Authorization: Bearer $GITHUB_TOKEN"`). If the download fails →
   report "source unreachable — local skills unchanged" and stop.

2. **Check, then confirm.** Run `--check` (below) and read its `replacePlan` block. When
   `replacePlan.needsConfirmation` is true, show `replacePlan.deleteAndRedownload` and
   `replacePlan.lost` (every local-only file that will disappear), then ask ONCE (AskUserQuestion)
   with `replacePlan.confirmText` as the question. Options:
   - **Replace — delete and download fresh** (recommended) → `--apply --replace --yes`
   - **Update only — overwrite changed files, keep local-only files** → plain `--apply`
   - **Cancel** → stop; nothing changes.

   Never pass `--yes` without the user's answer in this run — the script refuses `--replace` without
   it. When `needsConfirmation` is false (first install, none of our folders present) run plain
   `--apply` without asking. `--dry-run` shows the plan and asks nothing.

3. **Run it** from the project root with the mapped arguments:

   ```bash
   node .claude/scripts/sync-qc-skills.mjs --check --pretty [--branch X] [--only …] [--tools]
   node .claude/scripts/sync-qc-skills.mjs --apply --pretty [--replace --yes] [--branch X] [--only …] [--tools]
   ```

   Always run `--check` first and show the result; without `--dry-run`, follow with `--apply` per the
   user's answer in step 2. The script refuses to run inside the canonical preset repo itself
   (`preset.yml` with `id: qc` — use `git pull` there). With `--replace --yes` it stages each fresh
   folder first, swaps it in and restores the old folder on any failure (`replace-failed`). Plain
   `--apply` overwrites files whose content differs from the source and never deletes anything. A
   failed tool step is reported under `toolsApplied.failed` and never stops the skills copy.

4. **Report** the script's `summary`, then `applied` / `skills` as a short table
   (skill · result · files new / updated / current · local-only files), one line for `command` and
   `self` (this command and the script: new / updated / current), and — with `--tools` — one tools
   line from `tools` / `toolsApplied`:
   `tools: playwright-cli {version | installed now | not installed | failed: …} · browser {installed | failed} · gitignore {ok | added} · python {ready | packages installed now | packages missing | absent}`
   (without `--tools` show the `tools.planned` actions as "planned with --tools"). If
   `reloadRequired` is true, tell the user to **reload the Claude Code session** so the new skill
   versions are picked up. If `selfUpdated` is true, add one line: "the sync command / script itself
   was updated — run `/sync-skills` once more to use the new version". In `--dry-run` mode the header
   reads `⟳ Dry run — nothing copied`.

## Installing this command in a project that does not have it yet

Run once from the project root (PowerShell):

```powershell
New-Item -ItemType Directory -Force .claude\commands, .claude\scripts | Out-Null
Invoke-WebRequest https://raw.githubusercontent.com/AhmedZaher1233/spec-kit-qc/main/.claude/commands/sync-skills.md -OutFile .claude\commands\sync-skills.md
Invoke-WebRequest https://raw.githubusercontent.com/AhmedZaher1233/spec-kit-qc/main/.claude/scripts/sync-qc-skills.mjs -OutFile .claude\scripts\sync-qc-skills.mjs
```

or Git Bash:

```bash
mkdir -p .claude/commands .claude/scripts
curl -fsSL -o .claude/commands/sync-skills.md https://raw.githubusercontent.com/AhmedZaher1233/spec-kit-qc/main/.claude/commands/sync-skills.md
curl -fsSL -o .claude/scripts/sync-qc-skills.mjs https://raw.githubusercontent.com/AhmedZaher1233/spec-kit-qc/main/.claude/scripts/sync-qc-skills.mjs
```

Then start Claude Code in that project and run `/sync-skills`.
