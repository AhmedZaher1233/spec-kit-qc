# Test Plan: [FEATURE / CHANGE]

**Feature folder**: specs/[NNN-feature]/
**Status**: PENDING QC LEAD APPROVAL
**Author / date / version**: [QC / date / version]
**Policy**: .specify/memory/constitution.md — Quality Control
**Review**: qc-review.md

Keep sections 1–9; scale detail to risk. Replace guidance/examples with project decisions.
Use the project-profiles reference for applicability, not as a second policy source.
Before TC design, map source IDs and leave TC references pending; reconcile before final approval.

## 1. Scope, profile and responsibilities

- Change mode: [new / enhancement / bugfix / migration / configuration / legacy adoption / maintenance]
- Surfaces: [browser / API/events / native / data / library-CLI / infrastructure / AI-ML / content / other]
- In scope: [stories, interfaces, acceptance outcomes and affected components]
- Out of scope: [reason, risk and approval; do not silently exclude an in-scope AC]
- Existing behavior / regression impact: [changed dependencies, consumers and shared flows]
- Release unit / implementation state: [service build, package, dataset/job, device app, model, document etc.]
- Assumptions / unresolved decisions: [evidence, owner and confirmation point]

| Responsibility | Named owner / backup | Deliverable / decision | Needed by |
|---|---|---|---|
| Test design / execution | | | |
| Automation / suite maintenance | | | |
| Data / environment / external dependency | | | |
| Defect triage / fixes / retest | | | |
| QC approval / release acceptance | | | |

Milestones and effort: [design, dev dependency delivery, environment access, execution and retest].
Constraints: [people/device access, CI runtime, data/secret access, time/budget; tradeoffs agreed].

## 2. Risk, policy configuration and applicable checks

Reference approved constitution values. Missing applicable values are Pending with owner/due phase,
then BLOCKED when needed; irrelevant categories are N/A with justification.
Development readiness does not require an already deployed application.

| Risk / affected outcome | Likelihood / impact → priority | Test response / depth | Owner | Residual risk / decision |
|---|---|---|---|---|

| Test category | Required / N/A / Pending + reason | Observable acceptance / metric and source | Level / method / owner |
|---|---|---|---|
| Functional / contracts / compatibility | | | |
| Negative / boundary / state / integrity | | | |
| Roles / tenant isolation / security / privacy | | | |
| Reliability / recovery / concurrency / idempotency | | | |
| Performance / capacity / resources | | [metric, percentile, load/volume and limit] | |
| Platform / install / upgrade / runtime variants | | | |
| Usability / accessibility / locale | | [platform-appropriate target] | |
| Browser responsive / cross-browser / visual | | [browser scope only] | |
| Data reconciliation / lineage / rerun | | [data/migration scope] | |
| Model/evaluation quality / variance | | [AI scope; approved dataset/threshold/sample] | |
| Observability / logging / diagnostics | | | |
| Smoke / delivery check / regression | | [specific selection and rationale] | |

Add domain-specific checks where needed. An unavailable tool is not evidence a check is irrelevant.
Select impacted regression now and broader release regression as required by policy; record
omissions with risk/owner. Do not duplicate an existing dev-owned suite solely for QC ownership.

## 3. Requirement Traceability Matrix

One row per source FR/SC/AC/edge case, plus explicit Policy: references for quality checks.
A cross-cutting case/check may cover multiple rows; count unique requirements, not duplicate links.

| Source ID | REQ IDs | Expected outcome / check | Testable? / question | Risk / priority | Level / accountable owner | Target / method | Automation candidate | Smoke? | Case/check IDs |
|---|---|---|---|---|---|---|---|---|---|
| [FR/AC/etc.] | | | [Yes/Partially/No] | | | [target; automated/manual/mixed] | YES/NO | YES/NO | [story:TC or shared check] |

For each requirement, identify the full oracle, not merely a link. Designed steps may use a
browser, API request, CLI, job/harness, device or human review. Link valid lower-level evidence.
Missing expected behavior goes to clarify. No percentage from placeholders or non-existent tests.

## 4. Coverage, regression and measurement

| Measure | Numerator / denominator / exclusions | Target / enforcement | Evidence |
|---|---|---|---|
| Requirement design | Fully designed applicable ACs / all applicable in-scope ACs; partial separately | [policy] | Approved case mapping |
| Code line / branch | Covered executable lines / executable lines; covered branches / branches, per applicable layer; baseline/exclusions explicit | [constitution layer floors/mode] | Native coverage |
| Automation implementation | Fully/partly/not automated eligible cases; also show all-case manual remainder | [selected runner metric; never mix with execution] | Code/static inventory |
| Execution | PASS / FAIL / BLOCKED / NOT RUN / N/A for original planned cases and required variants | All mandatory scope passes at release | Native + local summary |
| Browser app validation | Observed/inferred/draft by 3c; optional for browser surface | Progress only, not release pass rate | CLI report |

Use the installed Link skill's own weighted static formula when that route is selected; record
its denominator explicitly. Other metrics may coexist but are not interchangeable.
Zero eligible cases means N/A with reason, not 100%. Retry success retains earlier failure evidence.

Regression selection: [suites/check IDs, change-impact rationale, CI stage, owner, estimated duration].
Baseline debt / flaky checks: [known issue, risk, owner, expiry and replacement evidence].
Quarantine cannot make a mandatory requirement pass; release criteria still apply.

## 5. Environments, prerequisites and readiness

Environment names are project-defined. A URL is only one possible target.

| Environment ID / purpose | Target / artifact / config identity | Access and health prerequisites | Data/integration parity | Owner / availability |
|---|---|---|---|---|
| [e.g. ci, device-lab, integration, staging] | [env refs; package/runtime/job/device etc.] | | | |

Map TEST-DATA [E]/[A]/[D] references when those artifacts exist; no credentials here.
Actual readiness: [build/dependency health, configuration, accounts, required data, permissions,
cleanup path and evidence storage]. Unknowns block dependent runs, not completed independent work.
Load/security/mutating scope and authorization: [target, owner, boundaries].
Evidence reuse between phases: [same scope/build/config/data? verification and reason].

## 6. Variants and human execution

| Target / platform / runtime | Required role / locale / data / device variants | Selection rationale | Case IDs / manual remainder |
|---|---|---|---|

Use only applicable dimensions. Bound a large matrix with risk-based selection and explicit
approval; do not imply every combination was run. Manual scope includes Automation Candidate NO,
partial automation, HUMAN steps and operator/subjective checks. Name tester/access/time/evidence.
Unsupported browser validation never eliminates native or backend-only coverage.

## 7. Automation implementation plan

This is the technical HOW; approved requirements/cases remain the oracle.
Choose feasible routes per feature, reuse existing assets and label unbuilt interfaces Proposed.
For manual-only scope, record rationale and execution handoff; unused code layers are N/A.
Do not create code, provision data or execute the application while writing this plan.

### 7.1 Feature assessment and approach

Feature behavior: [roles, state transitions, channels, data volumes, integrations and risks].
Existing tools/capabilities: [inspected files/config/version and access; not assumed].
Alternatives: [UI/API/native/job/CLI/evaluation/manual choices, cost/reliability and rationale].

| Target ID / surface / behavior → source or TC IDs | Mode | Runner/config / capability evidence | Why selected / alternative rejected | Outcome oracle / human remainder |
|---|---|---|---|---|
| [target] | link-playwright / project-runner / manual-only / unresolved | | | |

Link Playwright is conditional on supported scope; CLI validator 3c is browser-only.
For native/data/library/other targets, use the selected existing runner and its own results.
Hybrid features need end-to-end cross-surface evidence, correlation and one accountable owner.
Unresolved tool/interface decisions: [owner, due phase, affected checks and independent work].

### 7.2 Structure, reuse and responsibilities

For each target, specify actual automation root, config, package/runtime, verified command and
working directory. Prefer the existing repository structure. One shared config per compatible
runner is appropriate; different platforms may need separate configs. Never overwrite one
target's setup just to force the other into the same framework.
For a new project with no runner, propose tooling/config/dependencies with owner, rationale and
confirmation point. Assign setup work in 7.6 or section 8; label commands Proposed until verified
against actual configuration. Tool delivery is required before execution, not before development.

| Target / concrete file or layer | Reuse / extend / create / N/A | Existing candidate / decision evidence | Responsibility / planned interface | Cases / owner |
|---|---|---|---|---|
| [config and result adapter] | | | | |
| [UI page/component OR API/CLI/job/native driver] | | | | |
| [prerequisite/setup functions] | | | | |
| [lifecycle fixture / cleanup] | | | | |
| [data builders / constants / expected datasets] | | | | |
| [test/evaluation files and shared evidence helpers] | | | | |

For Link browser automation only, follow its actual shared config/POM structure:

```text
<automation root>/
  playwright.config.ts
  pages/                    screen actions/assertions; components/ for shared widgets
  prerequest/               API setup/lookup/cleanup functions; no UI provisioning
  fixtures/                 lifecycle wrappers only when needed
  tests/<area>/             approved TC journeys and step orchestration
  helpers/                  shared steps, evidence, unique data and readiness
  reports/ screenshots/ automation-logs/
```

Search the complete automation root before creating another screen/client/helper.
For Link, locators/UI assertion methods stay in page objects; specs orchestrate steps.
Other runners use their native architecture; do not invent POMs or screenshots for non-UI tests.
Record chosen optional layers in manifest target metadata and relevant runner configuration.

### 7.3 Prerequisite / pre-request design

Required starting states include relevant services, permissions, flags, parent records, accounts,
files/jobs/devices and workflow state. State dependency order explicitly; tests cannot rely on
another test having passed.

| PRE-ID / affected cases | Depends on | Required state | Supported setup method / planned function | Scope / owner | Observable readiness / timeout | Failure action |
|---|---|---|---|---|---|---|
| [PRE-01] | | | [API/UI/fixture/seed/job/device etc.] | [test/worker/run] | | |

For each provisioning function, document input/output IDs, access, idempotency, reconciliation
after uncertain mutation, retry bounds, cleanup ownership and error classification.
Use the actual supported interface; DB/direct seed needs approval and must preserve valid state.
Never provision away the behavior under test. UI setup uses page objects, API setup uses
prerequest functions; other stacks use equivalent existing setup helpers.
Immutable expensive setup may be shared; mutable records need isolation or justified serial use.
Failed setup blocks affected cases and does not automatically prove a product bug.

### 7.4 Test data lifecycle

Map plain-English TEST-DATA references to technical data builders/sources here.
Before case design use descriptive planned references; reconcile to actual tokens afterward.

| Data reference / cases | Values / bounds / required state / version | Reuse or generate / source | Provisioning / PRE-ID | Isolation / lifetime | Readiness by environment | Cleanup / recovery |
|---|---|---|---|---|---|---|
| [D-ref / planned data] | | | | | | |

Cover meaningful valid/invalid/boundary/locale variations; deterministic inputs for expected
results and unique run/worker/retry/variant ownership for created records. Protect tenant/role
and session boundaries. Track exact created IDs, not a broad deletion query or another team's data.
Cleanup only owned data after evidence, in reverse dependency order; preserve immutable seeds.
Plan cleanup on failure/timeout/retry and a scoped recovery owner for leftovers.
Use synthetic/anonymized datasets; state retention/redaction needs. Secrets remain external.
Recheck environment-specific availability; keep created data and application state out of test oracles.
For migrations/data/model work, record source/target/reference dataset versions and reconciliation.

### 7.5 Execution, assertions and reliability

| Target / case group | Stage / smoke | Parallel / serial / controlled concurrency | Required variants / data isolation | Oracle / observable assertion | Bounded wait / evidence / cleanup point |
|---|---|---|---|---|---|
| | | | | [approved source] | |

Link uses its Stage/Smoke fields and smoke → positive → negative gate. Other runners use their
verified native ordering and equivalent early readiness checks; do not invent unsupported tags.
State worker/retry/time budgets, polling condition, diagnostic output and stop/resume rules.
A concurrency requirement needs controlled multi-actor interleaving, not accidental worker overlap.
Retries expose every attempt; quarantine has owner/expiry/impact and cannot hide a mandatory failure.

Define appropriate evidence: screenshots for UI, payload/trace for services, exit/output for CLI,
reconciliation/job logs for data, device evidence for native, evaluation records for models.
Expected results come from approved rules/reference fixtures, not the same implementation formula.
For nondeterministic outputs define sample size, seed/repeats where useful, tolerance/statistical
acceptance and error budget before seeing results. Correlate external/async outcomes with a
per-run identifier. If no authorized observation exists, retain manual/BLOCKED scope.
A zero-test, partial or skipped run is not PASS; failures distinguish product/tool/data/environment.

### 7.6 Work order, ownership and maintenance

| Order / concrete files or change | Depends on | Owner / effort | Completion evidence / decision |
|---|---|---|---|
| [confirm provisional interfaces/tooling and inventory] | | | |
| [data/setup/lifecycle with cleanup verification] | | | |
| [reused/extended drivers and one representative critical check] | | | |
| [remaining approved cases and regression integration] | | | |
| [code/readiness review, scoped runs, results review and handoff] | | | |

Tailor rows to actual work. Dev dependencies go into section 8 and plan.md/tasks.md; QC-owned
acceptance automation stays in this worklist. Name code reviewers, suite/flake triage owner and
maintenance trigger (contract/UI/runtime/data change). Record actual placement and routine
deviations in execution history; material scope/approach/data-access changes require reapproval.

## 8. Development dependencies and delivery

| Requirement / need | Concrete requested change | Owner | Task reference / due phase | Ready when |
|---|---|---|---|---|
| [lower-level tests, observable IDs/interfaces, isolated seed, account roles, diagnostics etc.] | | | | |

Use only relevant asks; stable browser test IDs are not a blanket requirement for APIs/native.
Reuse valid developer-owned E2E or contract suites; assign one accountable owner per scope.
Plan risks/dependencies with real owners and escalation before promised execution dates.

## 9. Gates, defects and exceptions

- **Development entry**: reviewed testable outcomes, approved plan/case designs, source traceability
  and planned dependencies. No live app, final credentials or finished automation required.
- **Execution entry**: relevant implemented build/artifact, approved scope, runnable selected
  route or named manual tester, current config/data/access and cleanup/evidence readiness.
- **Suspend/resume**: [health/data/security failure threshold, scope paused, owner and recheck].
- **Release exit**: current in-scope ACs and required regression/checks pass on required variants;
  constitution defect/security/accessibility/metric floors met; manual remainder completed.
  Named QC/release owner approves GO. A partial/nonexecuted mandatory scope means NO-GO.

Defect workflow: [triage owner/cadence, severity vs priority, fix/retest owner, evidence and closure].
N/A needs applicability evidence. Pending decisions name owner/due phase. Allowed deferrals
retain severity, justification, risk, approver, owner and remediation date; they cannot change
the release floor or replace an undefined oracle. Actual scope changes go through clarify/spec.

| Exception / risk / deferred defect | Scope / reason / policy permission | Owner | Approver/date | Expiry / remediation / retest |
|---|---|---|---|---|

## Approval Record

Approved design hash = SHA-256 of exact UTF-8 bytes from file start to (excluding) the line
`## Approval Record`, after human approval changes Status to APPROVED. Records/logs below it
are excluded. A machine may record the human decision but may not invent it or update a stale
fingerprint as approval. Retain earlier approvals as history.

- Approved by/date/scope: [PENDING]
- Design hash and source spec / constitution / plan.md hashes: [PENDING]
- Manifest routing/config snapshot and requirement-dependency/derived-REQ paths/hashes: [PENDING]

| Story / shared scope | TC/check design path and SHA-256 | TEST-DATA design path and SHA-256 (or N/A reason) | Human approver/date |
|---|---|---|---|
| | | | |

## Implementation Verification

[Current source-ID to implementation evidence, incomplete scope/tasks, build/artifact identity.]

## CLI Validation

[Browser tool applicability; tool cli, observed/inferred/draft and unobserved scope/evidence.
No browser: N/A for this tool, with native/manual execution still planned. Not release sign-off.]

## Automation Review

[Per target: runner/version, scope, code/config hashes, pre-run/post-run review, actual checks,
findings and reviewer/approval. Link A/B only for Link targets; manual-only automation N/A.]

## Execution Log

| Run / date / target | Environment + build/config/data identity | Scope / variants / attempts | PASS / FAIL / BLOCKED / NOT RUN / N/A counts | Reports / diagnostics / cleanup | Tester |
|---|---|---|---|---|---|

## Checklist Results

| Case/check/variant | Target / environment / artifact | Result | Evidence / N/A reason | Defect / retest / remaining work | Tester/date |
|---|---|---|---|---|---|

## Release Decision

[Link qc-signoff.md: consolidated per-criterion GO/NO-GO, current scope/evidence identity,
coverage denominators, regression/manual remainder, residual risks and actual human decision.]
