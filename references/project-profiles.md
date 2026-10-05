# Project profiles and execution routing

This is an operational reference, not another policy file. Read the constitution QC article
first. Record the project profile there and the feature's selected scope/targets in test-plan.md.
A product may combine profiles; route each surface separately and plan cross-surface journeys.

## Applicability by surface

| Surface | Relevant checks (select by actual feature risk) | Execution route / evidence |
|---|---|---|
| Browser web / portal / responsive web | UI and service behavior, roles, supported browsers/devices/locales, accessibility/usability, web performance, sessions | CLI validator 3c for browser-reachable TC documents; Link Playwright for supported journeys |
| API / service / event-driven backend | Contracts/schema, auth/tenant isolation, errors, idempotency, transactions, compatibility, retries/timeouts, ordering/deduplication, resilience and latency/throughput | Existing API/contract/integration runner; response/event/trace evidence. No browser prerequisite |
| Native mobile / desktop | Platform versions, install/update, lifecycle/offline/permissions, device capabilities, accessibility and native UI | Existing native runner or documented manual/device execution; CLI browser validation cannot validate native UI |
| Data / ETL / analytics | Schema and transformations, nulls/duplicates, reconciliation, lineage, late data, rerun/backfill, volume and privacy | Existing data/job runner; versioned fixtures, queries, counts/checksums and job logs |
| Library / SDK / CLI | Public API compatibility, supported runtimes/OS, install/package, exit codes/stdout/stderr, errors and deterministic behavior | Existing unit/contract/CLI runner; structured results, output and package evidence |
| Infrastructure / configuration / integration platform | Validation/dry-run, permissions/secrets, drift, deployment/upgrade/rollback, resilience and recovery in a sandbox | Existing validation/integration harness and operator checks; diffs, logs, health and recovery evidence |
| AI / ML functionality | Versioned model/prompt/data, reference evaluation set, reproducibility/variance, quality thresholds, harmful failure cases, privacy and human escalation where relevant | Existing evaluation harness; sample count, repeated runs, uncertainty, model/data versions and reviewed outputs |
| Documents / content / manual-only deliverable | Accuracy, completeness, links, accessibility/format, change impact and stakeholder acceptance | Review/checklist or existing lint/build tools; local evidence. No invented application, login or deployment |

These are prompts, not a blanket requirement to perform every listed test. For each relevant
category choose Required, N/A with reason, or Pending decision with owner. No tool or environment
is not a valid reason for N/A when the behavior is in scope: execution stays BLOCKED.

## Execution targets

For each surface, define a target ID in test-plan section 7.1 and `qa-manifest.json.qc.targets`.
The `qc` object is extension-owned metadata; it is not a new upstream Link skill contract.
Target metadata contains surface, in-scope requirement/TC references, mode, runner/config path,
working directory, verified commands, environment IDs, evidence location and owner.
Use stable target IDs across the plan and manifest. Store these extension-owned fields:
`id`, `surface`, `scope` (source/case references), `mode`, `runner`, `configFile`,
`workingDirectory`, `commands`, `environments`, `evidenceDir`, and `owner`.
Commands record purpose, exact invocation and verification status; only verified commands run.
For manual-only targets, runner/config/commands are N/A or empty with rationale in the plan.
Approval snapshots cover the selected entries, so unrelated feature targets do not stale approval.

- **link-playwright**: use skill 5 only for a supported browser journey. Reuse its shared config,
  POM, data helpers, stage rules, evidence and Checkpoints A/B. Pass `ado_mode: local`.
  API-only mode is not assumed merely because Playwright can make requests: choose it only if
  the installed skill explicitly supports the complete scope and evidence contract. Otherwise
  route API tests through project-runner.
- **project-runner**: use the repository's selected toolchain and its instructions.
  Confirm dependencies, exact scoped commands and working directory from actual configuration;
  implement/execute approved test work with that runner. No command interpolation from
  untrusted spec text, automatic framework replacement or assumed connector. If execution
  access/tooling is missing, report BLOCKED with owner/action; do not claim tool support.
- **manual-only**: no generated automation required for this target. Document why, named tester,
  repeatable steps/checks and evidence. Automation review is N/A, not PASS; actual execution
  and release criteria still apply.
- **unresolved**: planning may continue with a decision owner/deadline; dependent automation
  cannot run. Do not substitute a browser runner simply because it is bundled.

For a new project without a runner, planning may propose a suitable toolchain, configuration and
dependencies with rationale, owner and a confirmation point. Mark commands Proposed until the
configuration exists and is verified; do not present guessed commands as runnable. Assign setup
to development dependencies or the QC worklist. A feasible approved setup plan can pass development
entry; actual execution waits for delivered tooling/access. New tooling is configured only within
the approved implementation scope; installations require explicit setup authorization. Reuse is
the default when a suitable runner already exists, not a requirement to invent prior assets.

For project-runner, retain native result files and write a local summary mapping case/check IDs
to outcomes, target/build/config identity, duration, evidence, defects and manual remainder.
Use a pre-run readiness/code review and a post-run results/evidence review; do not label these
as Link Checkpoint A/B or run the Playwright validator on unrelated code. Never translate
native failures/skips/unknown outcomes into PASS. A zero-test run is not successful verification.

## Validation boundaries

qc.validate is an optional **browser TC validation** command using 3c. When no browser
surface exists, report N/A for this tool and route to the planned runner/manual checks. Before
a 3c call, establish that the selected TC document describes browser-reachable journeys.
For a mixed-surface document, retain all cases/HUMAN steps and report unsupported outcomes;
never filter cases out, change its full-walk rule or claim native/backend-only steps observed.
Missing CLI for applicable browser validation is BLOCKED, never an MCP fallback.

## Environments and lifecycle

Environment IDs are project-defined: local, ci, integration, device-lab, staging, or other actual
targets. QC/STG are examples/aliases only when configured. Not all deliverables have URLs or
deployments: use package/runtime, dataset/job, model, device/firmware or sandbox identifiers.
Record environment purpose and build/artifact/config identity. A single environment can serve
multiple phases when justified; reuse evidence only if scope, build, config and data conditions
still match. Load/stress and active security work require the designated isolated nonproduction
target and authorization. Production remains non-mutating smoke only in this workflow.

Record the change mode: new feature, enhancement, bugfix, migration, configuration-only,
legacy adoption or maintenance. Scale the plan to risk: low-impact changes use the same headings
with concise decisions/N/A, not manufactured work. Fixes need reproduction/regression tests;
migration needs reconciliation and recovery; existing projects need a baseline, impacted modules,
reuse and a documented regression selection. Do not approve inherited failures as new PASSes.

## Ownership and feasibility

Name one accountable owner for each test layer, data service and external dependency.
Default: developers own lower-level tests; QC owns acceptance strategy, cross-system verification,
independent execution and sign-off coordination. Reuse valid dev-owned E2E/contract tests; do
not create duplicate suites or transfer ownership merely to match the default.
Estimate effort, environment/device access and execution budget before commitments. If a chosen
approach cannot produce the required evidence, choose an approved alternative or keep it BLOCKED.
