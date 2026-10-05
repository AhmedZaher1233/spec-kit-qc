# Spec Kit QC preset — v3.0

Testing is part of the Spec Kit development lifecycle. There are no separate `speckit.qc.*`
commands and no hooks any more: this preset appends a **Quality Control** article to the
constitution, appends testing sections to the core plan and tasks templates, wraps six core
commands with the testing activity of their stage, and ships the QC artifact templates. Policy
lives in one place — the constitution's Quality Control article (QC-0 … QC-18) — and the
procedures live in the Spec Kit commands.

## The flow

```text
/speckit.constitution   QC article + project configuration · Testing/qa-manifest.json · Testing/project-learning.md
/speckit.specify        stories with observable acceptance scenarios (core template, unchanged)
/speckit.clarify        + testability review (QC-5) → questions answered into spec.md, items in checklists/requirements.md
/speckit.plan           + test-plan.md beside plan.md: scope, risk, traceability, HIGH-LEVEL TEST-CASE TITLES,
                          automation approach, test data, EVERY OPEN QUESTION (decided by agent or asked once)
   ── human: the QC Lead approves test-plan.md — the ONLY QC review checkpoint ──
/speckit.tasks          gate on approval + zero Open questions → expands §4 into TEST-CASES-<feature>.md and
                          TEST-DATA-<feature>.md (skill-3 format, APPROVED via the plan) → QC phases in tasks.md
/speckit.analyze        + QC consistency (traceability, approval freshness, open questions, QC tasks present)
/speckit.implement      build with tests → run the app locally → live validation of the test cases on the local
                          instance (skill 3c) → automation (skill 5) → fix and re-run → updated test cases, run
                          status and results recorded in test-plan.md → push only afterwards
any time                /link-qc-md-to-html <file or feature folder> → HTML pages
```

Feature artifacts live in `specs/<NNN-feature>/`: `test-plan.md`, `TEST-CASES-<feature>.md`,
`TEST-DATA-<feature>.md`, `TC-REVIEW-<feature>.html`, `evidence/`. Automation code and run
outputs live under `Testing/Automation/` (paths in `Testing/qa-manifest.json`); skill 5 writes
`TEST-RUN-REPORT-<feature>.md` and `BUG-REPORT-<feature>.md` under its `reports` path, linked from
the test plan.

## What is in the preset

| File | Strategy | Content |
|---|---|---|
| `templates/constitution-template.md` | append | Development placeholder article (DEV-1 … DEV-7, filled by the development team: test ownership, dev-test quality, code coverage, CI, code review, local run, testability asks) + Quality Control article: roles (QC-0), authority, surfaces, the single review point, traceability, requirements quality, test design, test data, live validation, automation, UI audit, coverage, environments, evidence, defects, release, exceptions, retained skills, stage map (QC-18), configuration table |
| `templates/plan-template.md` | append | plan.md "Testing Strategy" + "QC Requirements for Development" |
| `templates/tasks-template.md` | append | Phase T (testability asks), per-story developer tests, Phase V (local run, validation, automation, fix loop, results, push) |
| `templates/test-plan-template.md` | new | the test plan — sections 1–11, Approval Record, result sections filled at implement |
| `templates/test-cases-template.md` | new | `TEST-CASES-<feature>.md` — the frozen skill-3 format read by skills 3c and 5 and the renderer |
| `templates/test-data-template.md` | new | `TEST-DATA-<feature>.md` — environments `[E]`, accounts `[A]` by secret name, data items `[D]` |
| `templates/qa-manifest-template.json`, `templates/project-learning-template.md` | new | the two project files the retained skills read |
| `commands/speckit.constitution.md` … `speckit.implement.md` | wrap | the core command stays byte-for-byte (`{CORE_TEMPLATE}`); the QC steps follow it (tasks and implement also add a gate before it) |
| `.claude/skills/link-qc-3c-validate-manual-test-cases-cli` | retained, trimmed | live validation through playwright-cli; policy text replaced by pointers to QC-n; MCP-comparison mode, `--republish` and skill-1/3/3b references removed |
| `.claude/skills/link-qc-5-test-run-automation` | retained, trimmed | Playwright automation, compliance validator, watchdog, run report; policy text replaced by pointers to QC-n; Azure DevOps linkage / close-out reduced to `ado_mode: local` |
| `.claude/skills/link-qc-6-ui-testing` | retained, optional, trimmed | visual audit through the Playwright MCP; thresholds read from the configuration table (`BREAKPOINTS_PX`, `WCAG_TARGET`, `CONTRAST_*` …); severity/priority rules point to QC-10 / QC-14 |
| `.claude/skills/link-qc-md-to-html` | new | one converter for every QC Markdown file, built from the existing renderers |
| `snippets/CLAUDE-md-qc-section.md` | optional | short agent orientation for work outside the commands |

## Where the former skills went

| Former skill | Now |
|---|---|
| 1 generate-update-testing-structure | `/speckit.constitution` creates `Testing/qa-manifest.json` and `project-learning.md`; layout and learning-file rules → QC-1, QC-17 |
| 2 review-requirements | `/speckit.clarify` testability review; six dimensions, risk levels, dependency rules → QC-5; findings → clarify questions and `checklists/requirements.md` (no REQ files — spec.md IDs are the traceability keys) |
| 3 generate-manual-test-cases | `/speckit.plan` (high-level cases, open questions) and `/speckit.tasks` (expansion); design rules → QC-6, data rules → QC-7, format → `test-cases-template` / `test-data-template`; its HTML renderer → `link-qc-md-to-html` |
| 3b validate (Playwright MCP) | retired — the team selected the CLI validator (3c) |
| 3c validate (playwright-cli) | **retained**, invoked by `/speckit.implement`; state semantics and authorisation → QC-8 |
| 4, 7, 8 Azure DevOps publish / sync | retired — Azure publishing and synchronisation are out of scope (QC-17) |
| 5 test-run-automation | **retained**, invoked by `/speckit.implement`; gates, smoke gate, heal rules, evidence, compliance → QC-9; its renderer mirrored into `link-qc-md-to-html` |
| 6 ui-testing | **retained**, optional at implement; measurement rules → QC-10 |
| 9 retesting | retired — retest rules → QC-14; reruns happen through 3c / 5 at implement |
| 10 white-box, 11 discover-business-rules | retired (earlier team decision); implementation verification is a test-plan section at implement; `/speckit.converge` covers spec-vs-code gaps |
| 12 adhd-output-style | retired — chat style, not a lifecycle activity |

## Install

Requires Spec Kit ≥ 0.16.2 (preset composition) and Python 3 with PyYAML for the template resolver
once a preset is installed (`python -m pip install pyyaml`). Node ≥ 18 for the retained skills.

```sh
specify preset add --dev ./spec-kit-qc        # path to this folder
specify preset list
specify preset resolve test-plan-template      # check composition
```

Then:

1. Copy the four retained skills from this preset's `.claude/skills/` into the project's
   `.claude/skills/`. The copies here are the **trimmed** versions (policy removed, pointers to the
   constitution); `/sync-skills` would re-download the untrimmed canonical versions, so use it only
   for `--tools` (playwright-cli) until the canonical repo carries the trimmed skills.
2. Send `templates/constitution-template.md` to the development team: its `## Development` article
   is a placeholder (DEV-1 … DEV-7) they fill with the developer-owned rules; the Quality Control
   article holds no developer rules. Then run `/speckit.constitution` once: both articles are merged
   (existing articles are preserved), the QC Lead fills the configuration table, and the two
   `Testing/` files are created.
3. Optionally append `snippets/CLAUDE-md-qc-section.md` to the project's `CLAUDE.md`.
4. Secrets: `E1_URL`, `A{n}_USER` / `A{n}_PASSWORD` in the secret store or environment — never in files.

## Upgrading from the v2.2 extension

1. `specify extension remove qc` (removes the `speckit.qc.*` commands and hooks), then install this preset.
2. Run `/speckit.constitution` to replace the old QC article with QC-0 … QC-18 (project values are kept).
3. Remove the retired skill folders from the project's `.claude/skills/` (1, 2, 3, 3b, 4, 7–12).
4. Existing features: keep old `Testing/Requirements` and `Testing/Manual_Test` trees as history. For an
   active feature run `/speckit.plan` to create `test-plan.md` (reuse existing TCs as §4 rows), get it
   approved, then `/speckit.tasks`. The manifest's `steering` keys now all alias the constitution.

History of the earlier reviews: [docs/history/QC-SKILLS-VS-SPECKIT-REVIEW-v2.2.md](docs/history/QC-SKILLS-VS-SPECKIT-REVIEW-v2.2.md).
