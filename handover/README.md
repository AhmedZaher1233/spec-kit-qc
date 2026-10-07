# QC handover for the default Spec Kit repository

This folder mirrors the development repository. Every file sits at the path where it belongs in
your project; copy it there. Three existing Spec Kit files receive a section (exact text in the
`*.QC-section.md` / `*.Testing-section.md` / `*.QC-rows.md` files, placement below). No built-in
command, skill name or skill definition changes. Default Spec Kit v1.1.x behaviour stays as it is.

## 1. Files to add or update

| # | File in this folder | Destination in your repo | Action | Purpose |
|---|---|---|---|---|
| 1 | `.specify/memory/constitution.QC-section.md` | `.specify/memory/constitution.md` | **insert section** | the QC rules (QC-0 … QC-18) and the QC configuration table; the default plan Constitution Check, `/speckit.analyze` and `/speckit.implement` enforce them |
| 2 | `.specify/templates/plan-template.Testing-section.md` | `.specify/templates/plan-template.md` | **append section** | plan.md gets a `## Testing` section the default `/speckit.plan` fills (story risk, traceability, high-level test cases, test data, automation approach, testability asks, open questions) |
| 3 | `.specify/templates/tasks-template.QC-rows.md` | `.specify/templates/tasks-template.md` | **insert three blocks** | tasks.md gets the test-case expansion (Foundational), the testability asks (per story) and the execution tasks (Polish) the default `/speckit.tasks` emits and `/speckit.implement` executes |
| 4 | `.specify/templates/test-cases-template.md` | same path | **new file** | format of `specs/<NNN-feature>/TEST-CASES-<NNN-feature>.md`, read by the automation skill and the renderer |
| 5 | `.specify/templates/test-data-template.md` | same path | **new file** | format of `specs/<NNN-feature>/TEST-DATA-<NNN-feature>.md` (environments `[E]`, accounts `[A]` by secret name, data `[D]`) |
| 6 | `.claude/skills/link-qc-5-test-run-automation/` | same path | **copy folder** (unchanged) | Playwright automation from approved test cases: run report, bug report, coverage CSVs, HTML |
| 7 | `.claude/skills/link-qc-md-to-html/` | same path | **copy folder** (unchanged) | renders every QC Markdown file to HTML (test cases review page, run report, any other file) |
| 8 | `.claude/skills/link-qc-6-ui-testing/` | same path | **copy folder** (optional, unchanged) | visual audit of implemented screens through the Playwright MCP |
| 9 | `Testing/qa-manifest.json` | same path | **new file, only if #8 is used** | the one file skill 6 requires; skill 5 does not need it |
| 10 | `CLAUDE.md.QC-block.md` | `CLAUDE.md` (repo root) | **append block** (optional, recommended) | four lines that keep the agent oriented; skill 5 reads `./CLAUDE.md` before generating code |

### Placement instructions (existing files)

**1 — `.specify/memory/constitution.md`.** Open the file. Insert the whole content of
`constitution.QC-section.md` as a new top-level section **immediately before the `## Governance`
heading**. If your constitution has no `## Governance` heading, insert it before the last `## …`
section. If a `## Quality Control` section already exists, replace that section from its heading
up to (not including) the next `## …` heading. Then bump the constitution version (MINOR — a
section was added), update **Last Amended**, and run `/speckit.constitution` once with the request
"keep every existing section; the Quality Control section is new; fill the QC project
configuration table from the repository" — the QC Lead fills the `[ ]` rows.

**2 — `.specify/templates/plan-template.md`.** Append the whole content of
`plan-template.Testing-section.md` **at the end of the file, after the `## Complexity Tracking`
table**. Do not change any existing section. Features whose `plan.md` already exists will not get
the section automatically (the template is copied only when plan.md is created); for an active
feature paste the section into its plan.md once and let `/speckit.plan` fill it.

**3 — `.specify/templates/tasks-template.md`.** `tasks-template.QC-rows.md` holds a header comment
and three blocks, each introduced by an HTML comment that names its place:
- Block (1): insert the three rows inside `## Phase 2: Foundational (Blocking Prerequisites)`,
  after the last `- [ ] T0xx …` row of that phase and before its `**Checkpoint**` line.
- Block (2): insert the row inside **every** `### Implementation for User Story N` block, after
  its last row.
- Block (3): insert the rows inside `## Phase N: Polish & Cross-Cutting Concerns`, before the row
  `- [ ] TXXX Run quickstart.md validation`.
- Paste the header comment (the lines between `<!--` and `-->` at the top of the file) right
  after the existing `**Tests**: …` line near the top of the template, so the default command
  knows these rows are mandated by the constitution and are not the optional test tasks.

**10 — `CLAUDE.md`.** Append the content of `CLAUDE.md.QC-block.md` at the end; if a
`## Quality Control` heading exists, replace that block.

## 2. How the default workflow now produces the QC outputs

| Step (default command) | What happens | Output |
|---|---|---|
| `/speckit.constitution` | Quality Control section present; QC Lead fills the configuration table (surfaces, environments, secret names, LOCAL_RUN_COMMAND, AUTOMATION_ROOT, thresholds) | constitution |
| `/speckit.specify` | stories with Given / When / Then acceptance scenarios, FR-### and SC-### | spec.md |
| `/speckit.clarify`, `/speckit.checklist` | ambiguities answered into spec.md; requirement-quality checklists (QC-5 names the dimensions) | spec.md `## Clarifications`, `checklists/*.md` |
| `/speckit.plan` | fills `## Testing`; each testing unknown is a `NEEDS CLARIFICATION` in the section **and** under Technical Context → Testing, so Phase 0 research resolves it | plan.md, research.md |
| QC Lead, optional | `/speckit.checklist testing — quality of the plan.md Testing section`, ticks the items (unchecked items make `/speckit.implement` ask before proceeding) | `checklists/testing.md` |
| `/speckit.tasks` | emits the three QC blocks with real IDs; constitution QC-3 makes them mandatory, so the "tests are optional" rule does not drop them | tasks.md |
| `/speckit.analyze` | flags a missing `## Testing` section, open testing questions or missing QC tasks as constitution violations (CRITICAL) | report |
| `/speckit.implement` — Foundational | writes `TEST-CASES-<f>.md` (`**Status:** PENDING QC REVIEW`) and `TEST-DATA-<f>.md` from the templates; renders the review page | `specs/<f>/TEST-CASES-<f>.md`, `TEST-DATA-<f>.md`, `TC-REVIEW-<f>.html` |
| **QC Lead** | reviews the page, edits the first header line to `**Status:** APPROVED — <name>, <date>` | approved test cases |
| `/speckit.implement` — stories | developer testability asks delivered with the story code | product code |
| `/speckit.implement` — Polish | app started locally; skill 5 runs the automation (it refuses until the document is APPROVED — the task halts, approve, re-run `/speckit.implement`, it resumes); Severity 1–2 / P1–P2 bugs fixed and re-run as a new phase; manual-only cases executed and recorded; HTML rendered | `<AUTOMATION_ROOT>/reports/<f>/TEST-RUN-REPORT-<f>.md`, `BUG-REPORT-<f>.md`, `.html`, `coverage/*.csv`; `## Execution Results` in TEST-CASES |
| `/speckit.converge` | spec ↔ code gaps after implementation | tasks.md convergence phase |

## 3. Capability coverage — former QC skills → this setup

| Former capability | Covered by | Difference |
|---|---|---|
| Requirements review (six quality dimensions, story risk) | `/speckit.clarify` + `/speckit.checklist`; story risk in plan `## Testing`; QC-5 | none in content; the checklist is a default command |
| Test plan: risk, traceability, high-level test cases, test data, automation approach, open questions | plan.md `## Testing`; unknowns through research.md | one artifact instead of two; no owner / profile block (removed on request) |
| Single formal review | QC Lead sets `**Status:** APPROVED` on the test-case file after reviewing the rendered page; optional `checklists/testing.md` for the design | approval is a human edit of one line, enforced by the automation skill's own gate |
| Detailed test cases + test data (frozen format, header counts, summary, traceability, negative coverage, standards alignment, coverage score, manual-only scenarios, potential bugs, open findings) | Foundational task executed by `/speckit.implement` with the two templates | identical structure minus validator-owned fields (`Validation`, `MCP validation`, `App validation progress`, evidence stamps); new `## Execution Results` table |
| Live validation of test cases against the running app (skill 3c) | **not reproduced** | wrong, missing or unnecessary steps are corrected when the automation run or manual execution meets the application (QC-8 → `## Enhancement Log` row). No live label capture, validation states or evidence stamps before the run; first automation runs may raise more open questions |
| Automation, compliance validator, run report, bug report (Severity + Priority), coverage CSVs, HTML | skill 5 unchanged, invoked by a Polish task with the configuration-table values | none |
| Manual execution results | `## Execution Results` table in TEST-CASES | previously in test-plan.md |
| UI visual audit | skill 6 unchanged, optional task; needs `Testing/qa-manifest.json` | none |
| HTML pages for every QC file | skill md-to-html unchanged | none |
| Approval hashes, push gate, retry cap, dedicated QC phase | **removed** | `/speckit.analyze`, `/speckit.converge`, the implement completion check and QC-15 (story done) cover the need |
| QA manifest (paths, runner) | configuration table rows (Paths, Execution) | manifest only with skill 6 |
| Learning file | see below | — |

**Learning file.** The custom learning section is gone: no template, no constitution rule, no
command step, nothing else reads or writes it. The unmodified automation skill still creates and
maintains `Testing/project-learning.md` for its own reuse of answers (it has no switch to turn this
off). Recommended: commit the file as skill-maintained; if you prefer it out of the repository, add
`Testing/project-learning.md` to `.gitignore` — the skill will then re-ask its data and provisioning
questions on every fresh clone.

## 4. Setup (once per repository)

1. Copy files 4–8 (and 9–10 if wanted) to their destinations; apply the three insertions (1–3).
2. Run `/speckit.constitution` as described under placement 1; the QC Lead fills the table.
3. Install Playwright in the automation project the first time skill 5 creates or reuses it
   (`npx playwright install chromium`); Node ≥ 18 for the skills.
4. Secrets: `E1_URL`, `A{n}_USER` / `A{n}_PASSWORD` in the environment or secret store — never in
   files.

## 5. Verification (default workflow)

1. `/speckit.plan` on a feature → plan.md contains `## Testing` with all seven subsections; any
   `NEEDS CLARIFICATION` in it has a matching decision in research.md.
2. `/speckit.tasks` → tasks.md contains the three Foundational rows, one testability row per
   story, and the Polish rows (automation, manual results, HTML). `/speckit.analyze` reports no
   CRITICAL constitution finding.
3. `/speckit.implement` → `specs/<f>/TEST-CASES-<f>.md` exists with `**Status:** PENDING QC REVIEW`;
   `/link-qc-md-to-html specs/<f>` renders `TC-REVIEW-<f>.html` with gate PASS.
4. QC Lead sets `**Status:** APPROVED — <name>, <date>`; `/speckit.implement` resumes; skill 5
   writes `TEST-RUN-REPORT-<f>.md` with a `## Phase 1` section and `BUG-REPORT-<f>.md`; the HTML
   run report renders with gate PASS.
5. `## Execution Results` in TEST-CASES holds one row per manual case and run.

## 6. Verified before handover

- Filled sample from the templates: review-page renderer gate PASS for both `PENDING QC REVIEW`
  and `APPROVED`, TEST-DATA renders, `tc-hash.mjs` counts exactly the test cases (the results
  table adds none).
- Skill 5 self-tests: validator 18/18, run report 27/27, watchdog 10/10, config inventory 7/7,
  tc-hash 14/14. The skills are byte-identical to the kit's copies.
