
<!-- Appended to the core tasks template by the "qc" preset (strategy: append). /speckit.tasks emits
     the three QC phases below with real task IDs and paths (constitution QC-18): Phase T right
     after "Foundational", Phase V after the last user story and before "Polish". Only tasks that
     apply to the approved test-plan.md are emitted. If test-plan.md is not APPROVED or §11 still
     has an Open question, /speckit.tasks stops before generating anything. -->

## Phase T: Testability & QC Handover (after Foundational, before user stories)

**Purpose**: deliver the developer-owned asks from test-plan.md §9 / plan.md "QC Requirements for Development" so the implementation is testable from the first story.

- [ ] TXXX Confirm test-plan.md is APPROVED (design hash recorded) and §11 has no Open question; record the TEST-CASES / TEST-DATA hashes in its Approval Record
- [ ] TXXX [P] Add stable test identifiers for [screens / components] in [paths]
- [ ] TXXX [P] Expose observable interfaces for [async / out-of-band outcomes] in [paths]
- [ ] TXXX Provide isolated seed, readiness check and cleanup hooks for [data] in [paths]
- [ ] TXXX Provide test accounts / roles on the local build via secret names (A{n}_USER / A{n}_PASSWORD) — never values in files
- [ ] TXXX Provide the local run script / health endpoint used for validation: [command]
- [ ] TXXX Configure CI checks and coverage reporting per the constitution's Development article (DEV-3, DEV-4)

## Per user story (inside each "Implementation for User Story N" block)

- [ ] TXXX [USn] Developer-owned unit / component / integration tests for [requirement IDs] in [paths], written before or alongside the code (constitution Development article DEV-1)

## Phase V: Validation, automation and fix loop (after the last user story, before Polish)

**Purpose**: validate and automate the completed, runnable implementation against the approved test cases; fix what is found; push only afterwards.

- [ ] TXXX Build and run the implementation locally ([command]); confirm the E1 base URL responds and test accounts sign in
- [ ] TXXX [browser scope] Live-validate specs/[###-feature]/TEST-CASES-[feature].md on the local instance with skill link-qc-3c-validate-manual-test-cases-cli (`--authorize-revision`); confirm the design-field diff is empty and record the result in test-plan.md "Live validation"
- [ ] TXXX Fix every discrepancy (PB-n) and not-implemented finding in product code; re-run validation on the changed scope
- [ ] TXXX [link-playwright] Implement and run automation for the approved automation candidates with skill link-qc-5-test-run-automation (`ado_mode: local`, Checkpoint A, smoke → positive → negative, Checkpoint B); record the phase in test-plan.md "Automation runs"
- [ ] TXXX [project-runner] Implement and run [runner] tests for [TC IDs] per test-plan.md §8; retain native results and write the local summary
- [ ] TXXX Fix application bugs from the run (BUG-n); re-run the affected tests as a new phase until no Severity 1–2 / P1–P2 defect is open; retests follow QC-14
- [ ] TXXX Execute the manual remainder ([TC IDs], [HUMAN] steps) and record results in test-plan.md "Manual execution results"
- [ ] TXXX [UI scope, optional] UI visual audit of [screens] with skill link-qc-6-ui-testing; log findings as bugs
- [ ] TXXX Update test-plan.md: implementation verification, validation result, automation run status, manual results, release-decision table; render pages with `/link-qc-md-to-html specs/[###-feature]`
- [ ] TXXX Push the branch only after the above tasks are complete and the fix loop is closed (QC-15)
