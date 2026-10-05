---
description: "Implement and verify the approved automation plan with the selected project runner"
---

# QC automation implementation and initial verification

User input: $ARGUMENTS (feature/approved TC path; optional configured target/environment)

1. Read `.specify/extensions/qc/references/skill-integration.md`, project profiles and the
   approved test plan. Confirm source, plan, TC and data-design snapshots. Separate
   implementation completeness from test results: use converge if installed, otherwise record
   spec-ID-to-implementation evidence in Implementation Verification. Preserve task IDs.
   Work on implemented independent scope while recording missing behavior as incomplete.
2. Read optional CLI validation evidence when applicable. Its absence does not block approved
   automation. Confirmed discrepancies and design gaps still require resolution; unanswered
   business expectations go through clarify, never inferred from code.
3. Read section 7 and select each target explicitly. Confirm the actual build/interfaces,
   current code inventory, readiness and data-access scope before dependent work.
   Material strategy/scope/data changes need plan revision; do not rewrite approved design.
4. Route by target:
   - link-playwright: invoke **`link-qc-5-test-run-automation`** with approved TCs, selected
     paths/config, plan, policy and explicit `ado_mode: local`. Keep its POM, stages, shared
     helpers, checkpoints and immutable history. Skip all external synchronization phases.
   - project-runner: implement the planned tests using the repository's selected harness and
     instructions. Deliver explicitly planned new setup within authorized scope, then validate
     actual scoped commands/working directory and dependencies before execution.
     Keep native output plus the local summary defined by project-profiles.md. Do not claim
     Link compliance or use its validator on unrelated code.
   - manual-only: record automation N/A with rationale and hand off planned checks to qc.execute;
     do not create an empty suite or call it PASS.
   - unresolved/unavailable: mark dependent automation BLOCKED, state owner/action and continue
     independent targets. Do not install/substitute a framework without the agreed plan.
5. Implement in planned order: reuse layers, prerequisite functions, data lifecycle, one critical
   check, then remaining scope. Tests exercise the actual behavior; setup only establishes
   valid starting state. Verify isolation, bounded waits, cleanup/recovery and evidence.
6. Run the selected pre-run code/readiness checks, then scoped tests; review final code/results.
   Record build/config/data identity, target, original scope, per-variant outcomes, attempts,
   native reports, evidence, cleanup and manual remainder. Zero tests/skips/partial output
   never mean PASS. Repairs need rerun and post-run review; do not weaken assertions.
7. Initial verification completes only when required scope/checks pass and blockers are resolved.
   Keep compliance/review separate from execution. Report work still needing designated
   integration/release targets; this command does not deploy, publish or issue release sign-off.
