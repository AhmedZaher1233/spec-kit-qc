<!-- Merge before Dependencies & Execution Order in the tasks template override.
     Use TXXX placeholders; emit only applicable work from the approved QC plan. -->

## Phase N: Testability & QC Handover

**Purpose**: deliver concrete dependencies from plan.md and the QC plan for this change.

- [ ] TXXX Provide observable test interfaces/identifiers for [actual UI/API/CLI/job/native scope]
- [ ] TXXX Provide isolated setup, readiness checks and cleanup/recovery for [needed data/resources]
- [ ] TXXX Provide required roles/access on [configured environment IDs] via secret references
- [ ] TXXX Expose approved observation/test interfaces for [async or external outcomes, if relevant]
- [ ] TXXX Implement/reuse lower-level tests for [requirements], with [accountable owner]
- [ ] TXXX Configure applicable CI checks, coverage/result reporting and diagnostics per QC plan

<!-- Do not create irrelevant browser/OTP/account work. Reuse valid existing suites.
     QC-owned automation/execution and real human approval are tracked in test-plan.md;
     tasks must not manufacture passing results or sign-off. -->
