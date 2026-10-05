---
description: Execute the implementation planning workflow to generate design artifacts, and write the feature test plan (test-plan.md) with high-level test cases, automation approach, test data and open questions in the same run — the single QC review point.
strategy: wrap
---

{CORE_TEMPLATE}

## Test plan (qc preset, constitution QC-3 … QC-7, QC-9, QC-11, QC-12)

Runs after Phase 1 design above and before the Completion Report. It writes
`FEATURE_DIR/test-plan.md` and the Testing Strategy of plan.md. It writes no code, runs no tool
against an application and asks nothing that evidence can answer.

1. **Load context.** spec.md (with Clarifications), `checklists/requirements.md`, the constitution's
   Quality Control article and configuration table, plan.md / research.md / data-model.md /
   contracts/ (to decide HOW to test, never WHAT), `Testing/qa-manifest.json`,
   `Testing/project-learning.md` (Index → tags → Q&A), and any existing test-plan.md (preserve its
   Approval Record and history; a changed design needs re-approval).
2. **Resolve the template.** Run the `resolve-template` script for `test-plan-template` (same
   script family as `__SPECKIT_COMMAND_CONSTITUTION__`: `scripts/bash/resolve-template.sh
   test-plan-template --json` / PowerShell / Python equivalent) and use its content as the
   structure. Keep every section; scale detail to risk.
3. **Fill sections 1–3.** Change mode, surfaces (QC-2), in / out of scope, regression impact,
   local run for validation, named owners (QC-0; role names only while unknown), story risks
   (QC-5), applicable check categories (Required / N/A with reason / Pending with owner), and one
   traceability row per FR / SC / acceptance scenario / edge case plus `Policy:` rows.
4. **Design the high-level test cases (§4).** Derive from the spec only (QC-6): one happy path per
   acceptance scenario, one edge case per user-facing input, one negative case per guarded action,
   the five negative categories covered or N/A, boundary values from stated limits, decision
   tables and state transitions where they apply, error-guessing items as cases only when the spec
   states the outcome, one variant per required locale, out-of-band outcomes as full cases with an
   interface `[E{n}]` or a `[HUMAN]` step, smoke ≈ 10–20 % and ≥ 1 per screen, stage mapping and
   automation candidacy per QC-6. Titles are business-readable sentences so the reviewer can judge
   coverage from the table alone. Stable IDs: `TC-<AREA>-NNN`, locale variants suffix `b`.
5. **Fill sections 5–7.** Coverage measures with explicit denominators (QC-11), regression
   selection, environments (local first), data references `[E]/[A]/[D]` with plain-English items
   and planned preparation way (QC-7; secrets by name only), variants and manual remainder.
6. **Automation approach (§8).** Per target: mode (link-playwright / project-runner /
   manual-only / unresolved) with capability evidence from the repository (existing config, runner,
   page objects — inspected, not assumed), reuse / extend / create decisions, prerequisites, run
   groups (read-only parallel; data-changing or shared-data serial), oracles, evidence, work order
   starting with one representative critical case. Unbuilt interfaces are Proposed with an owner.
7. **Development dependencies (§9) and plan.md.** List concrete testability asks (stable test IDs,
   observable interfaces for async outcomes, isolated seed / cleanup hooks, roles via secret names,
   local run script). Copy them into plan.md "QC Requirements for Development" and fill plan.md
   "Testing Strategy" (routes, counts, local run, developer-owned tests, open-question counts).
8. **Open questions (§11).** Every uncertainty about test cases, automation or test data becomes
   one row with ID, affected items, 2–3 options and a Recommended answer with reason. First resolve
   from evidence (learning file → spec and constitution → code → read-only data) and record those
   as **Decided by agent** with the source. Then ask the remaining rows in ONE batch
   (AskUserQuestion where available; one recommended option each). Record answers in §11 and apply
   them to §3–§8. Business-rule gaps are routed to `/speckit.clarify` and listed as Open until the
   spec answers them. Never proceed on an unanswered recommendation.
9. **Header and approval.** Fill the header counts (test cases, smoke, automation candidates,
   manual-only; open / decided / answered). Set `Status: PENDING QC LEAD APPROVAL`. Leave the
   Approval Record `[PENDING]`; never write a hash or an approval. Record generic project facts
   learned (not feature decisions) in `Testing/project-learning.md` under the Planning Model.
10. **Report** (append to the Completion Report): test-plan.md path, counts, open questions still
    Open (each with its recommended answer), decided-by-agent count, dev asks copied to plan.md,
    and the instruction: *the QC Lead reviews test-plan.md — scope, §4 titles, §8, §11 — and sets
    `Status: APPROVED` with name and date in the Approval Record; this is the only QC review
    before `/speckit.tasks`.* Offer `/link-qc-md-to-html specs/<feature>/test-plan.md` for a
    review page.
