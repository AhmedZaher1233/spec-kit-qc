# Spec Kit QC kit — v4.0 (default-first)

Testing runs inside the **default** Spec Kit workflow. Nothing in this kit changes a built-in
command, a skill name or a skill definition. The kit adds exactly three pieces of project
guidance and ships two unchanged skills (plus one optional):

| Piece | Destination in a project | What it does |
|---|---|---|
| `## Quality Control` section | `.specify/memory/constitution.md` | the QC rules (QC-1 … QC-18) and the QC configuration table; enforced by the default plan Constitution Check, `/speckit.analyze` and `/speckit.implement` |
| `## Testing` section | `.specify/templates/plan-template.md` | the test design inside plan.md (story risk, traceability, high-level test cases, test data, automation approach, testability asks, open questions) |
| Quality Control task rows | `.specify/templates/tasks-template.md` | test-case expansion in Foundational, testability asks per story, automation / manual execution / HTML in Polish |
| `test-cases-template.md` | `.specify/templates/` | the format of `TEST-CASES-<feature>.md` (test cases + `## Test Data`) that the skills read |
| `link-qc-5-test-run-automation`, `link-qc-md-to-html`, optional `link-qc-6-ui-testing` | `.claude/skills/` | Playwright automation with run report, bug report and coverage; HTML rendering; optional visual audit — used as-is |

**Everything the development team needs is in [`handover/`](handover/README.md)**: real files at
their destination paths, placement instructions for the existing files, the capability map,
setup and verification. `preset.yml` packages the same files for `specify preset add` when a
team prefers the preset mechanism.

## The flow (default commands only)

```text
/speckit.constitution   Quality Control section present; QC Lead fills the configuration table
/speckit.specify        stories with observable acceptance scenarios
/speckit.clarify        ambiguities → spec.md ## Clarifications          (QC-5)
/speckit.checklist      requirement quality checklists                    (QC-5)
/speckit.plan           plan.md ## Testing; testing unknowns → research.md (QC-3)
   QC Lead (optional)   /speckit.checklist testing — reviews the ## Testing section
/speckit.tasks          Foundational: expand TEST-CASES (incl. ## Test Data) · per story: testability asks ·
                        Polish: automation (skill 5), manual cases, HTML
/speckit.analyze        constitution alignment, coverage spec ↔ plan ↔ tasks
/speckit.implement      writes TEST-CASES-<f>.md (Status PENDING QC REVIEW) → QC Lead sets APPROVED →
                        runs the app locally → skill 5 automation → fixes defects → manual results →
                        HTML pages
/speckit.converge       spec ↔ code gaps afterwards
```

Feature artifacts: `specs/<NNN-feature>/TEST-CASES-<NNN-feature>.md` (test cases + `## Test Data`),
`TC-REVIEW-<NNN-feature>.html`. Automation outputs (skill 5): `<AUTOMATION_ROOT>/reports/<NNN-feature>/`
`TEST-RUN-REPORT-<NNN-feature>.md`, `BUG-REPORT-<NNN-feature>.md`, `.html`, `coverage/*.csv`.

## What changed from v3 (and why)

| v3 | v4 | Reason |
|---|---|---|
| six wrapped `speckit.*` commands | none | default command behaviour has priority |
| `test-plan.md` + approval hashes | plan.md `## Testing`; unknowns as `NEEDS CLARIFICATION` → research.md | one plan artifact, default research mechanism |
| live validation step (skill 3c) | removed; corrections per QC-8 when automation or manual execution finds them | no validator step requested; nothing retained depends on 3c |
| `Testing/qa-manifest.json` | only when skill 6 is used | skill 5 works without it |
| `Testing/project-learning.md` template + rules | none; skill 5 keeps its own file (see handover README) | custom learning section removed |
| TEST-CASES `APPROVED` via the plan | `PENDING QC REVIEW` until the QC Lead sets `APPROVED` | approval stays meaningful |
| Phase T / Phase V, push gate, retry cap | rows in the default Foundational / story / Polish phases | minimal mechanics |

History: v3 → [docs/history/](docs/history/). Tooling for this kit only: `.claude/commands/sync-skills.md`
+ `.claude/scripts/sync-qc-skills.mjs` pull the three skills from `https://github.com/AhmedZaher1233/spec-kit-qc`.
