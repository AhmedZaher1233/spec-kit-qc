---
description: "Design manual TCs from reviewed requirements with link-qc-3-generate-manual-test-cases"
---

# QC manual TC design

User input: $ARGUMENTS (feature; optional --revision, --audit, --lang ar|en)

1. Read `.specify/extensions/qc/references/skill-integration.md`. Require a current
   `qc-review.md` and `test-plan.md`. Resolve profile and interfaces from the plan; no assumed
   browser, login, account or URL for non-UI checks. Draft plans permit draft TC design; keep the
   development gate closed until plan and TC approvals are recorded.
2. Invoke **`link-qc-3-generate-manual-test-cases`** for each reviewed story's REQ file, passing
   the policy adapter, exact SPEC/story output path and relevant matrix rows. This is design
   only: no browser, URL or credential request. Before initial development, set implementation
   status to Not implemented; on later revisions use known status and never reset it blindly.
   Unknown live status stays unknown. For a technical-only story, cases describe observable
   service/command/job/device outcomes through the planned interface. Reference a runbook or
   harness for code-level details; do not invent GUI steps. Shared checks can be reused with
   source mappings, and data requirements may be N/A with reason when genuinely unnecessary.
3. Keep the skill's complete format, design techniques, requirement-based coverage, manual-only
   scenarios, test data references and human steps. Map TCs to spec IDs through REQ IDs.
   Use the supported `Tags` field for Responsive/Usability/etc.; keep `Type` as
   happy-path / edge-case / negative, `Stage` as the skill defines, and
   `Automation Candidate: YES/NO`. No invented Category field.
4. Deliver per-story TEST-CASES and TEST-DATA markdown plus the rendered TC-REVIEW HTML page
   (Arabic sidecar when requested). New cases are draft — not app-validated, or
   not-implemented — pending implementation. Design coverage and app validation are separate.
5. For normal writes, update the test-plan TC mappings and list uncovered or partly covered
   rows. Reconcile section 7's behavior groups and planned data references to actual TC IDs and
   TEST-DATA tokens. Preserve technical layer details in the plan, not the manual documents.
   If new cases alter setup, data isolation, execution grouping or developer dependencies,
   update the plan/asks and flag the changed design for human reapproval. On `--audit`, update
   nothing, including the plan. On `--revision`, patch only the
   authorized cases and apply the skill's approval rules; mark the wrapper's prior approval
   fingerprint stale when content changed and require a new human decision.
6. QC lead/BA reviews the rendered page and can return `REVIEW-COMMENTS-<feature>.md`.
   Record approval identity, date and the actual approved file hashes in test-plan.md only
   when the human approves. Offer `/speckit.qc.validate` only for browser-app scope; do not launch it
   from design. Validation is optional and does not block pre-development approval.
