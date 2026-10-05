---
description: Execute the implementation plan by processing all tasks in tasks.md, then run the app locally, validate the approved test cases live, run the automation, fix what is found and record the results before the code is pushed.
strategy: wrap
---

## QC entry check (qc preset, constitution QC-3, QC-4) — runs with the checklist status check below

Before executing tasks, read `FEATURE_DIR/test-plan.md`, `TEST-CASES-<feature>.md` and
`TEST-DATA-<feature>.md`. Require: test plan `Status: APPROVED` with a design hash that still
matches, no §11 row Open, TEST-CASES `Status: APPROVED` and the recorded TEST-CASES / TEST-DATA
hashes current. On failure report the gap and the fix (`/speckit.plan` + QC Lead approval,
`/speckit.tasks`) and STOP, like a failing checklist; a user "proceed anyway" is recorded as a
deviation in test-plan.md and never manufactures an approval.

{CORE_TEMPLATE}

## Validation, automation and fix loop (qc preset, constitution QC-8, QC-9, QC-13 … QC-15)

Runs when the user-story tasks are complete and Phase V of tasks.md is reached. Execute Phase V
in this order, marking each task `[X]` as it completes. Nothing is pushed before step 7.

1. **Run the implementation locally.** Build and start the application with the local run command
   from plan.md "Testing Strategy" / test-plan.md §1 (ask once if absent and record it in the
   learning file). Confirm the base URL responds and record build identity. Set `E1_URL` and the
   account secret names `A{n}_USER` / `A{n}_PASSWORD` from the project's secret store or attended
   login; never write a secret anywhere. Update the TEST-DATA `[E1]` row value with the local URL.
2. **Implementation verification.** For every source ID in test-plan.md §3 record Implemented /
   Partial / Not implemented with evidence in test-plan.md "Implementation verification". Set the
   TEST-CASES `Implementation status` header accordingly (this header is owned by validation).
3. **Live validation (browser scope).** Invoke the skill `link-qc-3c-validate-manual-test-cases-cli`
   with the explicit path `FEATURE_DIR/TEST-CASES-<feature>.md`, `--authorize-revision`, the local
   environment, the known implementation status and the data-change authorisation for the local
   build (yes, unless the user says otherwise). Pass `qa_standards: .specify/memory/constitution.md`
   and `white_box_reports: not applicable`. The skill probes playwright-cli first; if it is missing
   report BLOCKED with `/sync-skills --tools` and continue with step 5 for non-browser targets.
   Afterwards diff the design fields (ID, Type, Locale, Requirement, Stage, Description, Smoke,
   Automation Candidate, Data effect, Shared data, Tags, Data Oracle, `[HUMAN]` markers, token set,
   TC set) against the pre-run file: the diff must be empty. If it is, restore
   `Status: APPROVED — via test-plan.md … · re-confirmed after live validation <date>` when the
   skill set PENDING HUMAN REVIEW (QC-8). If a design field changed, revert that change and report
   it as a validation defect. Record counts, progress, Potential Bugs and "needs a human run" in
   test-plan.md "Live validation". Non-browser targets: execute the planned runner or manual
   procedure instead and record results in "Manual execution results".
4. **Fix discrepancies.** Every `PB-n` and every `not-implemented` finding on in-scope behaviour is
   a product defect (QC-14): fix it in product code (never in the test case or the requirement),
   re-run the affected scope with the same skill, and record the retest. A genuine coverage gap
   found live is added to test-plan.md §4 as a new row and flagged for QC Lead re-approval before it
   is expanded; a requirement contradiction goes to `/speckit.clarify`.
5. **Automation.** For link-playwright targets invoke `link-qc-5-test-run-automation` with the
   approved document path, the feature label as User Story, the local environment, `ado_mode:
   local`, `qa_standards: .specify/memory/constitution.md`, `coverage_target` /
   `coverage_mechanism` and `smoke_gate` from the constitution configuration (defaults 80 %, soft
   block, 30 %), and the data-change authorisation for this run (the same explicit yes / no given
   for validation in step 3 — never stored, never assumed). The skill
   runs Checkpoint A, the data-readiness ask, smoke → smoke gate (30 %) → positive → negative,
   Checkpoint B, and writes `TEST-RUN-REPORT-<feature>.md`, `BUG-REPORT-<feature>.md` and the
   rendered page under the manifest's `reports` path. For project-runner targets implement and run
   the planned tests with the repository's verified command; retain native results and write the
   local summary (case ID → outcome, build, duration, evidence). Fix application bugs (`BUG-n`) in
   product code and re-run as a new phase until no Severity 1–2 / P1–P2 defect is open; heal only
   test-code defects per QC-9; never weaken an assertion or skip a test to pass.
6. **Record results.** In test-plan.md fill "Automation runs" (one row per phase: environment and
   build, counts passed / failed / incomplete / skipped / not run / partial, Checkpoint A / B,
   links to the run and bug reports), "Manual execution results" (manual remainder, `[HUMAN]`
   steps, non-browser checks — PASS / FAIL / BLOCKED / NOT RUN / N/A, never blank) and the
   "Release decision" table with actuals; leave Decision PENDING unless the QC Lead and release
   owner state it. Update TEST-CASES header lines only through the skills. Optional: UI audit with
   `link-qc-6-ui-testing` for screens the plan marked — pass the screen URLs / labels, the design
   reference if any, `breakpoints` (constitution `BREAKPOINTS_PX`), `locales` (`LANGUAGES`) and
   `qa_standards: .specify/memory/constitution.md`; log findings as bugs. Render pages with
   `node .claude/skills/link-qc-md-to-html/scripts/convert.mjs FEATURE_DIR` (every QC Markdown
   file in the folder) and read the payload gates.
7. **Push gate.** Only when validation findings and automation failures are fixed and re-run,
   Phase V tasks are `[X]`, and test-plan.md records the results, is the branch pushed / the PR
   opened (QC-15 story-done). Otherwise report what remains and stop before pushing.
8. **Report** (extend the Completion Report): local build identity; validation counts and
   progress; PB → fix → retest outcomes; automation phases with status, coverage and compliance
   gates; open bugs by severity; manual remainder; release-decision status; files updated
   (TEST-CASES, TEST-DATA, review page, run report, bug report, test-plan.md).
