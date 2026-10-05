---
description: Generate an actionable, dependency-ordered tasks.md for the feature, gated on the approved test plan; expand the approved high-level test cases into TEST-CASES / TEST-DATA documents and add the QC phases.
strategy: wrap
---

## QC gate (qc preset, constitution QC-3, QC-4) — runs BEFORE the task generation below

1. Read `FEATURE_DIR/test-plan.md`. Require `Status: APPROVED`, an Approval Record with approver,
   date and design hash, and zero rows with Status **Open** in §11. Recompute the design hash
   (SHA-256 of the exact UTF-8 bytes from the file start up to, excluding, the line
   `## Approval Record`) and compare; recompute the recorded spec.md / constitution / plan.md hashes
   and compare.
2. If any check fails: STOP before writing tasks.md. Report what is missing (not approved / stale
   design hash / stale source / Open question IDs) and the fix (`QC Lead approves test-plan.md`,
   `re-run /speckit.plan`, `answer Q-n`). Do not generate tasks, test cases or test data.

{CORE_TEMPLATE}

## Test-case expansion and QC phases (qc preset, constitution QC-3, QC-6, QC-7, QC-18)

Runs after tasks.md has been generated above, in the same invocation.

1. **Expand the approved rows.** Resolve `test-cases-template` and `test-data-template` with the
   `resolve-template` script and write `FEATURE_DIR/TEST-CASES-<feature>.md` and
   `FEATURE_DIR/TEST-DATA-<feature>.md`, where `<feature>` is the feature folder name
   (e.g. `TEST-CASES-003-recent-activities.md`). One full test case per test-plan.md §4 row with the
   same TC-ID, Type, Stage, Smoke, Automation Candidate and scope; preconditions, numbered steps
   (action, labelled target, value, inline assertion; two-step loading; reference tokens
   `[E]/[A]/[D]` with names; `[HUMAN]` where the plan says so), expected result, data oracle from
   §6, Data effect and Shared data from §8.4. Every token resolves to a TEST-DATA row and every row
   is used; usernames and URLs only in TEST-DATA, secrets only by name.
2. **Status and header.** `Status: APPROVED — via test-plan.md Approval Record (<date>, <approver>)`
   — the plan review is the approval (QC-3). Implementation status from §1 (normally
   `Not implemented` before development: every TC `not-implemented — pending implementation`;
   otherwise `draft — not app-validated`). Fill every header count from the tables; compute the
   weighted requirement coverage; list patterns applied / skipped; keep the `MCP validation` line
   with six zero / not-implemented counts. Fill Traceability Matrix, Negative Coverage, Standards
   Alignment, Requirement Coverage Score and Manual-Only Scenarios from §3–§4; Open Questions
   holds pointers to §11 rows only (none Open).
3. **Self-check, then render.** Verify: every §3 source ID maps to ≥ 1 TC; minimums met; no
   selector, code, endpoint or literal URL / username in any step; every step has one assertion;
   header counts equal the tables. Render with the retained renderer and read the payload:
   `node .claude/skills/link-qc-md-to-html/scripts/convert.mjs FEATURE_DIR/TEST-CASES-<feature>.md
   --strict --pretty`. Fix MISMATCH / BLOCKED in the markdown and re-render; clear `data-literal`
   and `data-ref-unresolved` warnings. The page `TC-REVIEW-<feature>.html` is written beside the
   document.
4. **Record freshness.** In test-plan.md Approval Record, fill the "Expanded design" line with the
   SHA-256 of both files and today's date. Do not touch anything above that line.
5. **Add the QC phases to tasks.md** from the appended tasks template: **Phase T** (testability
   asks from test-plan.md §9 / plan.md, inserted after Foundational), a developer-test task inside
   every user-story phase, and **Phase V** (local run, live validation with
   `link-qc-3c-validate-manual-test-cases-cli` for browser scope, automation with
   `link-qc-5-test-run-automation` for link-playwright targets, project-runner tasks for other
   targets, fix loop, manual remainder, optional UI audit, test-plan result sections, push).
   Emit only tasks that apply to the approved plan, with real IDs, TC IDs, paths and the local run
   command; renumber so IDs stay sequential; extend the Dependencies section (Phase T before user
   stories; Phase V after the last story and before Polish).
6. **Report**: files written with TC / data counts and coverage, renderer gate, QC task counts per
   phase, and the next step (`/speckit.analyze`, then `/speckit.implement`).
