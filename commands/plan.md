---
description: "Create a risk-based QC plan and feasible automation design for the feature's project profile"
---

# QC test and automation planning

User input: $ARGUMENTS (feature; optional existing plan to update)

1. Read `.specify/extensions/qc/references/skill-integration.md` and its project-profiles
   reference, clarified spec/review/REQs, manifest and constitution QC article. Resolve project
   surfaces, change mode, risk, existing test ownership/tooling and configured environments.
   Do not assume web UI, a URL, Playwright, TypeScript, three environments or a deployment.
2. Read technical plan/contracts and targeted existing tests/configuration only to design HOW
   to test. Use Link skill 5 code-craft guidance only for a supported link-playwright target.
   Requirement outcomes come from the spec. Record evidence for existing interfaces; unbuilt
   details are Proposed with a confirmation point, never invented selectors/endpoints.
3. Fill `.specify/extensions/qc/templates/test-plan-template.md` in
   `specs/<feature>/test-plan.md`. Keep sections 1–9 and Approval Record; scale detail to the
   change. A small fix can use concise rows. Preserve execution and approval history.
   Planning does not write automation code, mutate data or execute tools against a target.
4. Complete scope, affected modules/dependencies and regression impact. Assign named test,
   data/environment, defect-triage and release owners; record effort/access constraints,
   milestones, risk and escalation. Use roles only while names are genuinely unknown.
5. Derive applicable checks from project profile and feature risk. Cover relevant functional,
   negative, security, integrity, compatibility, reliability/recovery and nonfunctional
   outcomes; add browser/native/data/library/infrastructure/model checks only where applicable.
   An absent tool/data/config is BLOCKED for relevant execution, not N/A.
6. Build complete source/REQ/test traceability for every FR/SC/AC/edge case and policy check.
   Before qc.tcs, keep TC links pending with source IDs. Map suitable lower-level tests as
   evidence too; a manual procedure for a backend case may invoke a harness, not a browser.
   State design coverage, automation eligibility, static implementation coverage and actual
   pass results separately, with numerator/denominator and exclusions.
7. Complete **7.1**: compare feasible approaches per behavior and select link-playwright,
   project-runner, manual-only or unresolved per target. Explain risk, observability,
   repeatability, setup/maintenance cost, tool availability and credible alternatives.
   Hybrid products use multiple targets with an explicit cross-surface evidence plan.
8. Complete **7.2**: reuse/extend/create inventory and concrete file/runner boundaries.
   Reuse valid existing suites regardless of team ownership; do not create duplicate configs,
   page classes, API clients or tests. Use UI page/component layers only for UI automation.
   Record verified commands and working directories from the repository, not guessed syntax.
   For new projects, propose the runner/configuration/dependencies with owner and rationale;
   mark commands Proposed until actual setup verifies them. Assign that setup as planned work.
9. Complete **7.3–7.4**: prerequisite dependency order, required states, setup method,
   idempotency/retry/reconciliation, access, scope, readiness and cleanup. Match API/UI/job/
   filesystem/device/seed setup to actual capability and authorization. Never provision away
   the behavior under test. Map eventual TEST-DATA tokens, deterministic inputs, data versions,
   unique identities, tenant/role isolation and cleanup/recovery without exposing secrets.
10. Complete **7.5**: stage/group ordering, independent/serial/control-concurrency decisions,
    supported variants, bounded waits, retries/quarantine policy, trusted outcome oracle,
    runner-appropriate evidence and execution budget. For probabilistic outputs, define sample
    size, repeatability and acceptance thresholds; a single favorable run is not proof.
11. Complete **7.6**: ordered work with files, dependencies, owner, estimate and completion
    evidence. Include one representative critical check end-to-end before expanding coverage.
    Record maintenance/flake triage ownership. Missing capabilities block only dependent work.
12. Copy dev-owned test/testability asks into one plan.md QC Requirements for Development
    section for tasks.md; QC-owned acceptance automation stays in this plan's worklist.
    Capture spec/constitution/technical-plan/REQ/dependency snapshots and the selected manifest
    routing/config entries after edits. Set PENDING QC LEAD APPROVAL; the human approves design,
    not execution success. Before development, allow unbuilt interfaces with agreed contracts/
    owners; actual credentials, deployed targets and passing runs belong to execution readiness.
    Reconcile actual TC/data references after qc.tcs; material changes require reapproval.
