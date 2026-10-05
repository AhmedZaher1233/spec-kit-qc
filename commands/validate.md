---
description: "Live validation of manual TCs with link-qc-3c-validate-manual-test-cases-cli"
---

# QC live TC validation — CLI

User input: $ARGUMENTS (TC path / feature / story / SPEC folder; optional --audit,
--authorize-revision, --lang ar|en)

This is the selected optional browser validator. It runs when a browser-reachable application
is available, or on existing implemented browser features before approval. It is separate
from design and from the automated regression suite.

1. Read `.specify/extensions/qc/references/skill-integration.md`. Resolve existing
   TEST-CASES / TEST-DATA files, requirements, constitution and manifest. Read project-profiles
   and determine surface applicability before probing tools. No browser scope: report tool N/A
   and hand off actual checks to the planned runner/manual execution, without asserting PASS.
   For mixed-surface documents, preserve the full set/HUMAN markers and report unsupported
   outcomes; do not narrow the skill's full-walk rule or claim native/backend-only outcomes.
   No TCs yet: direct the user to `/speckit.qc.tcs`.
2. Invoke **`link-qc-3c-validate-manual-test-cases-cli`**, passing the exact documents and project
   adapter. Probe CLI availability first; absent CLI/browser means BLOCKED for validation,
   with the selective tools-setup hint from README. No MCP fallback and no silent install.
3. Reuse confirmed environment/account facts; request only missing runtime information and
   authorization. Use attended login or secret names, never secret values in commands or chat.
   Record which environment/build is checked and whether data changes are authorized.
   Pass current known implementation status from the tester/build handover; a pre-development
   Not implemented header is historical. Let the skill reclassify from the current entry-point
   observation without consulting a code-analysis report or treating unbuilt behavior as a bug.
4. Preserve the skill's full walk: each common flow once and every TC's unique tail, every run.
   No narrowing scope or skipping earlier evidence. Recheck freshness, stop at human steps,
   preserve implementation-state distinctions and require an observed expected outcome before
   stamping a TC validated. A successful CLI command alone is not validation.
5. Approved TC documents are read-only by default. Pass `--authorize-revision` only when the
   user authorized revisions. If authorized edits actually change a document, the skill sets
   PENDING HUMAN REVIEW and renders the page again; invalidate its plan approval fingerprint
   and request reapproval. Record the changed local revision for downstream automation.
6. Report Potential Bugs separately from coverage gaps, environment blockers and unknown
   expectations. Route coverage gaps to skill 3 revision and business questions to clarify.
   Never accept observed incorrect behavior as the requirement.
7. Record the normal run's tool, environment/build, observations and evidence paths in
   test-plan.md under CLI Validation. Keep design coverage unchanged unless a real design gap
   or approved design update is recorded. `--audit` writes nothing anywhere.
8. Report validated/inferred/draft/not-implemented/discrepancy counts as produced by the skill,
   unobserved human steps, unanswered questions and cleanup/session closure. Next, approved TCs
   can go to `/speckit.qc.automate`. A CLI run is not release sign-off.
