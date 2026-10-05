# Test Plan: [FEATURE / CHANGE]

**Feature folder**: specs/[NNN-feature]/
**Status**: PENDING QC LEAD APPROVAL
**Author / date / version**: [test designer / YYYY-MM-DD / 1]
**Policy**: .specify/memory/constitution.md — Quality Control (QC-0 … QC-18)
**Development plan**: plan.md (written in the same /speckit.plan run)
**Test cases**: [N] high-level ([S] smoke · [A] automation candidates · [M] manual-only)
**Open questions**: [o] open · [d] decided by agent · [a] answered

<!-- Written by /speckit.plan beside plan.md. This is the single QC review point (QC-3): the QC
     Lead approves scope, risk, the high-level test-case table (§4), the automation approach (§8),
     the test-data needs (§6) and every open question (§11) in one sitting. /speckit.tasks then
     expands §4 into TEST-CASES-[feature].md and TEST-DATA-[feature].md without a second review.
     Keep every section; scale detail to risk — a small fix uses concise rows, never manufactured
     work. Replace guidance text with decisions. Sections after "Approval Record" are filled during
     /speckit.implement and never change the approved design. -->

## 1. Scope, profile and responsibilities

- Change mode: [new / enhancement / bugfix / migration / configuration / legacy adoption / maintenance]
- Surfaces (QC-2): [browser / API-events / native / data / library-CLI / infrastructure / AI-ML / content]
- In scope: [stories, interfaces, acceptance outcomes, affected components]
- Out of scope: [reason, risk, approval; never silently exclude an in-scope acceptance criterion]
- Existing behaviour / regression impact: [changed dependencies, consumers, shared flows]
- Release unit / implementation state: [service build, package, dataset / job, device app, document]
- Local run: [how the implementation will be hosted locally for validation — command, port, seed]
- Assumptions: [evidence and confirmation point]

| Responsibility (QC-0) | Named owner / backup | Deliverable / decision | Needed by |
|---|---|---|---|
| Test design / expansion | | | |
| Automation / suite maintenance | | | |
| Data / environment / external dependency | | | |
| Defect triage / fixes / retest | | | |
| QC approval / release acceptance | | | |

Milestones and effort: [design, dev dependency delivery, local build ready, validation, automation, retest].

## 2. Risk and applicable checks

Reference constitution configuration values. A missing applicable value is an open question
(§11); an irrelevant category is N/A with justification; a missing tool is BLOCKED, not N/A.

| User story / risk | Risk (High / Medium / Low, QC-5) and why | Test response / depth | Owner | Residual risk |
|---|---|---|---|---|

| Test category (QC-12) | Required / N/A + reason | Observable acceptance / metric and source | Level / method / owner |
|---|---|---|---|
| Functional / contracts / compatibility | | | |
| Negative / boundary / state / integrity | | | |
| Roles / tenant isolation / security / privacy | | | |
| Reliability / recovery / concurrency / idempotency | | | |
| Performance / capacity | | [metric, percentile, load, limit] | |
| Platform / install / upgrade variants | | | |
| Usability / accessibility / locale | | [platform-appropriate target] | |
| Browser responsive / cross-browser / visual (UI audit) | | [browser scope only] | |
| Data reconciliation / lineage / rerun | | [data / migration scope] | |
| Model / evaluation quality / variance | | [AI scope] | |
| Observability / logging / diagnostics | | | |
| Smoke / regression | | [selection and rationale] | |

## 3. Requirement traceability matrix (QC-4)

One row per FR / SC / acceptance scenario / edge case, plus `Policy:` rows for required checks.

| Source ID | Expected outcome / check | Testable? | Risk / priority | Level / owner | Target / method | TC IDs |
|---|---|---|---|---|---|---|
| [FR-001 / US1-AC1] | | [Yes / Partially → Q-n] | | | [target; automated / manual / mixed] | [TC-…] |

Missing expected behaviour is an open question routed to /speckit.clarify; it is never invented.

## 4. High-level test cases (QC-6)

One row per planned test case. This table is what the reviewer approves; /speckit.tasks expands
each row into the full case without changing ID, type, stage, smoke, candidacy or scope.
Minimums: one happy path per acceptance scenario, one edge case per user-facing input, one
negative case per guarded action; the five negative categories covered or N/A with reason;
one variant per required locale (ID suffix `b`); smoke ≈ 10–20 % and at least one per screen.

| TC-ID | Title | Source IDs | Type | Priority | Stage / smoke | Method / target | Automation candidate | Data refs |
|---|---|---|---|---|---|---|---|---|
| [TC-LOGIN-001] | [User signs in with valid credentials] | [US1-AC1, FR-001] | happy-path | P1 | @positive / smoke | [web / link-playwright] | YES | [A1, E1] |

Negative coverage: invalid input [TC-IDs] · boundary [TC-IDs] · missing required [TC-IDs] ·
unauthorised [TC-IDs] · error recovery [TC-IDs or N/A + reason].
Techniques applied: [EP / BVA (boundaries from the spec) / decision table / state transition].
Error guessing (E1–E6) as cases: [IDs] · as questions: [Q-n] · not applicable: [reason].
Interaction patterns applied / skipped: [P1 reveal, P2 async wait, P3 explicit trigger, P4 navigation state, P5 page-load; reasons].
Out-of-band outcomes: [channel → interface [E{n}] or [HUMAN] step; TC-IDs].
Manual-only scenarios: [TC-IDs, category and why they cannot be automated].

## 5. Coverage and regression (QC-11)

| Measure | Numerator / denominator / exclusions | Target | Evidence |
|---|---|---|---|
| Requirement design | (fully + 0.5 × partially covered ACs) / in-scope ACs | [policy] | §3–§4 mapping |
| Code line / branch | per applicable layer; baseline and exclusions explicit | [constitution floors] | native coverage |
| Automation | (fully + 0.5 × partially automated TCs) / all TCs | [constitution: 80 %, soft block] | skill 5 coverage CSVs |
| Execution | PASS / FAIL / BLOCKED / NOT RUN / N/A per TC and required variant | all mandatory scope passes | §Execution results |

Regression selection: [suites / TC IDs, change-impact rationale, CI stage, owner].
Baseline debt / flaky checks: [issue, owner, expiry]. Zero eligible cases is N/A with reason.

## 6. Environments, prerequisites and test data (QC-7, QC-12)

| Environment ID / purpose | Target / build identity | Access and health prerequisites | Data / integration parity | Owner |
|---|---|---|---|---|
| local | [developer build; command / URL via E1] | | | |
| [ci / integration / staging …] | | | | |

Accounts, URLs and data appear only as `[A{n}]` / `[E{n}]` / `[D{n}]` references, expanded in
TEST-DATA-[feature].md; secrets by name only.

| Data ref | Plain-English item and required state | Used by TC IDs | Known status | Planned way to prepare | Isolation / cleanup |
|---|---|---|---|---|---|
| E1 | application base URL (local, then configured environments) | all | UNKNOWN | — | — |
| A1 | [role] account | | UNKNOWN | secret names A1_USER / A1_PASSWORD | — |
| D1 | [e.g. an approved order with 12 line items] | | UNKNOWN | [e2e scenario / api (to be confirmed) / manual] | [unique ownership; delete after evidence] |

Load / security / mutating scope and authorisation: [target, owner, boundaries].

## 7. Variants and human execution (QC-13)

| Target / platform / runtime | Required role / locale / data / device variants | Selection rationale | TC IDs / manual remainder | Tester |
|---|---|---|---|---|

Manual scope includes Automation Candidate NO, `[HUMAN]` steps and subjective checks.

## 8. Automation approach (QC-9)

The technical HOW; approved requirements and §4 remain the oracle. Unbuilt interfaces are
labelled Proposed. Manual-only scope records the rationale; unused layers are N/A. No code is
written and no tool is run while planning.

### 8.1 Approach per target

| Target ID / surface / behaviour → TC IDs | Mode | Runner / config / capability evidence | Why selected / alternative rejected | Oracle / human remainder |
|---|---|---|---|---|
| [target] | link-playwright / project-runner / manual-only / unresolved | | | |

### 8.2 Structure, reuse and responsibilities

| Target / file or layer | Reuse / extend / create / N/A | Existing candidate / evidence | Responsibility / planned interface | TCs / owner |
|---|---|---|---|---|
| [shared config and result adapter] | | | | |
| [page object / API / CLI / job / native driver] | | | | |
| [prerequisite / setup functions] | | | | |
| [data builders / constants / expected datasets] | | | | |
| [test files and shared evidence helpers] | | | | |

Browser automation uses the shared layout under `Testing/Automation/` (one `playwright.config.ts`,
`pages/`, `prerequest/`, `tests/<Area>_Tests/`, `helpers/`, `reports/`, `screenshots/`,
`automation-logs/`). Other runners use their native architecture. Commands are Proposed until
verified in the repository.

### 8.3 Prerequisites

| PRE-ID / affected TCs | Depends on | Required state | Setup method / planned function | Scope / owner | Readiness / timeout | Failure action |
|---|---|---|---|---|---|---|
| [PRE-01] | | | [API / UI / fixture / seed / job] | | | |

Never provision away the behaviour under test; failed setup blocks the affected TCs and is not a
product bug by itself.

### 8.4 Execution, assertions and reliability

| Target / TC group | Stage / smoke | Parallel / serial (Data effect, Shared data) | Variants / isolation | Oracle / assertion | Wait bound / evidence / cleanup |
|---|---|---|---|---|---|

Order: setup → smoke → smoke gate (30 %) → positive → negative. Retries expose every attempt; a
zero-test, partial or skipped run is not PASS; evidence is captured at the assertion point.

### 8.5 Work order

| Order / files or change | Depends on | Owner / effort | Completion evidence |
|---|---|---|---|
| [confirm interfaces / tooling; automation inventory] | | | |
| [data / setup with cleanup] | | | |
| [one representative critical TC end to end] | | | |
| [remaining TCs, regression integration, Checkpoint A/B, handoff] | | | |

## 9. Development dependencies (copied into plan.md "QC Requirements for Development" and tasks.md)

| Need | Concrete requested change | Owner | tasks.md reference / due phase | Ready when |
|---|---|---|---|---|
| [lower-level tests, stable test IDs, observable interfaces, isolated seed / cleanup hooks, roles, diagnostics, local run script] | | | | |

## 10. Gates, defects and exceptions (QC-14 … QC-16)

- **Development entry**: this plan APPROVED, no Open question, every in-scope source ID mapped to
  TC IDs, §9 asks in tasks.md. No live app or finished automation required.
- **Validation / automation entry** (during /speckit.implement): implementation complete and
  running locally, approved TEST-CASES / TEST-DATA present, data and access ready, cleanup and
  evidence paths known.
- **Push / release exit**: validator findings and automation failures fixed and re-run; in-scope
  ACs pass on required variants; constitution floors met; manual remainder done; named owner records
  GO / NO-GO in the Release decision section below.

Defect workflow: [triage owner / cadence, severity vs priority, fix / retest owner, evidence, closure].

| Exception / deferred risk | Scope / reason / policy permission | Owner | Approver / date | Expiry / remediation |
|---|---|---|---|---|

## 11. Open questions (QC-3)

Every question about test cases, automation and test data lives here. One specific, answerable
question per row naming what it affects. Decide from evidence where possible (**Decided by
agent**, cite it); otherwise 2–3 options with one **(Recommended)** and a one-line reason, asked
in one batch. Business-rule gaps go to /speckit.clarify. No row may stay **Open** when
/speckit.tasks starts; answers update §3–§8 before approval.

### 11.1 Test cases

| ID | Question | Affects | Options | Recommended — reason | Status | Answer / evidence |
|---|---|---|---|---|---|---|
| Q-1 | [After 3 failed sign-ins, is the account locked or only delayed?] | [TC-LOGIN-004] | A: lock 15 min · B: captcha · C: no limit | A — matches FR-007 "temporarily blocked" | Open / Decided by agent / Answered | |

### 11.2 Automation

| ID | Question | Affects | Options | Recommended — reason | Status | Answer / evidence |
|---|---|---|---|---|---|---|

### 11.3 Test data

| ID | Question | Affects | Options | Recommended — reason | Status | Answer / evidence |
|---|---|---|---|---|---|---|

## Approval Record

Approved design hash = SHA-256 of this file's exact UTF-8 bytes from the start up to (excluding)
the line `## Approval Record`, computed after the QC Lead sets Status to APPROVED. A machine may
record the human decision but never invent it or refresh a stale hash as approval. Earlier
approvals stay as history.

- Approved by / date / scope: [PENDING]
- Design hash: [PENDING]
- Source hashes (spec.md, constitution, plan.md): [PENDING]
- Expanded design (freshness only, no separate approval): TEST-CASES-[feature].md [sha256] · TEST-DATA-[feature].md [sha256] · expanded on [date] by /speckit.tasks

<!-- Everything below is filled during /speckit.implement. It records results and never changes
     the approved design above. -->

## Implementation verification

| Source ID | Implemented | Evidence (build, screen / endpoint seen, test) |
|---|---|---|

## Live validation (QC-8)

- Tool / run: [playwright-cli version · date · environment (local first) · build]
- Result: [v] validated / [e] enhanced / [i] inferred / [d] discrepancy / [n] not-implemented / [r] draft — progress [o]/[N]
- Design-field diff: [empty — Status kept APPROVED | changed → validation defect]
- Potential bugs: [PB-n → BUG-n / fixed in commit …]
- Needs a human run: [TC-IDs with [HUMAN] steps]
- Updated files: TEST-CASES-[feature].md · TEST-DATA-[feature].md · TC-REVIEW-[feature].html

## Automation runs (QC-9)

| Phase / date | Environment + build | Scope / variants | Passed · Failed · Incomplete · Skipped · Not run · Partial | Compliance A / B | Run report / bug report |
|---|---|---|---|---|---|

Coverage (automation, weighted): [x % — target y %, mechanism]. Fix loop: [bugs fixed → re-run phase].

## Manual execution results

| TC-ID / check | Variant | Result (PASS / FAIL / BLOCKED / NOT RUN / N/A) | Env / build / date | Tester | Evidence / bug |
|---|---|---|---|---|---|

## Release decision (QC-15)

| Criterion | Required | Actual | Evidence | Met? |
|---|---|---|---|---|
| In-scope acceptance criteria pass on required variants | all | | | |
| Regression selection passes | all | | | |
| Open Severity 1–2 / P1–P2 defects | 0 | | | |
| Security findings Critical / High | 0 | | | |
| Accessibility Critical / Serious violations | 0 (where applicable) | | | |
| Every configured language passes (RTL where applicable) | all | | | |
| Manual remainder executed | all | | | |
| Traceability complete | every source ID → executed TCs | | | |

**Decision:** [GO / NO-GO / PENDING] · **Recorded by:** [QC Lead + release owner / date]
