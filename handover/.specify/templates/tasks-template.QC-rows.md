<!--
  QUALITY CONTROL TASKS — NOT sample tasks and NOT "tests" under the "Tests are OPTIONAL" rule above.
  These rows are mandated by the constitution (section "Quality Control", QC-3): the spec's acceptance
  scenarios are the feature's request for test work. Emit every applicable row with real task IDs and
  paths; drop a row only when plan.md ## Testing marks its scope N/A. Three blocks, three placements:
  (1) inside "Phase 2: Foundational", (2) inside each "Implementation for User Story N",
  (3) inside "Phase N: Polish & Cross-Cutting Concerns", before "Run quickstart.md validation".
-->

<!-- (1) Add to "## Phase 2: Foundational (Blocking Prerequisites)", after the last foundational task -->

- [ ] TXXX Expand plan.md `## Testing` into specs/[###-feature]/TEST-CASES-[###-feature].md using .specify/templates/test-cases-template.md: one test case per high-level row (same TC-ID, Type, Locale, Smoke, Automation Candidate, Data effect, Shared data), steps per constitution QC-6, header `**Status:** PENDING QC REVIEW`
- [ ] TXXX Write specs/[###-feature]/TEST-DATA-[###-feature].md using .specify/templates/test-data-template.md: every [E]/[A]/[D] token used by the test cases resolves to one row; accounts by secret name only (QC-7)
- [ ] TXXX Render the review page with skill link-qc-md-to-html (`/link-qc-md-to-html specs/[###-feature]`) and hand it to the QC Lead; the QC Lead sets `**Status:** APPROVED — <name>, <date>` in TEST-CASES-[###-feature].md after review (QC-3) — nobody else sets it

<!-- (2) Add to each "### Implementation for User Story N" block (one row per ask the plan lists for that story) -->

- [ ] TXXX [USn] Deliver the testability ask from plan.md `## Testing` → Developer testability asks: [stable test ids on … | observable interface for … | seed / cleanup hook for … | test accounts via secret names | LOCAL_RUN_COMMAND / health endpoint] in [paths]

<!-- (3) Add to "## Phase N: Polish & Cross-Cutting Concerns", before "Run quickstart.md validation" -->

- [ ] TXXX Build and start the application locally with [LOCAL_RUN_COMMAND]; confirm the [E1] base URL responds and the [A1] account signs in
- [ ] TXXX Run the acceptance automation with skill link-qc-5-test-run-automation on specs/[###-feature]/TEST-CASES-[###-feature].md (User Story label "[###-feature]", environment local, `ado_mode: local`, `qa_standards: .specify/memory/constitution.md`, coverage target / enforcement and smoke gate from the constitution configuration table). The skill writes TEST-RUN-REPORT-[###-feature].md and BUG-REPORT-[###-feature].md under [AUTOMATION_ROOT]/reports/[###-feature]/; it refuses to run until the document is APPROVED (QC-3)
- [ ] TXXX Fix in product code every Severity 1–2 / P1–P2 bug the run recorded in BUG-REPORT-[###-feature].md and re-run the affected cases with the same skill as a new phase (QC-9, QC-15); a wrong, missing or unnecessary test step found on the way is corrected per QC-8 (Enhancement Log row)
- [ ] TXXX Execute the manual-only test cases ([TC-IDs], [HUMAN] steps) on the local build and record PASS / FAIL / BLOCKED / NOT RUN / N/A per case in the `## Execution Results` table of TEST-CASES-[###-feature].md (QC-13); file any defect in BUG-REPORT-[###-feature].md
- [ ] TXXX [optional, browser scope] Visual audit of [screens] with skill link-qc-6-ui-testing (screen URLs / labels, design reference, `breakpoints` = BREAKPOINTS_PX, `locales` = LANGUAGES, `qa_standards: .specify/memory/constitution.md`); requires Testing/qa-manifest.json
- [ ] TXXX Render the HTML pages with skill link-qc-md-to-html for specs/[###-feature] and [AUTOMATION_ROOT]/reports/[###-feature]
