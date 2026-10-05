<!-- TEST-CASES-{feature}.md — written by /speckit.tasks from the APPROVED test-plan.md §4, one TC per approved
     row. TC-ID, Type, Stage, Smoke and Automation Candidate match the plan row exactly; scope changes go through
     test-plan.md, never here. There is no second human review (constitution QC-3): Status is APPROVED because the
     plan is, and the plan's Approval Record records this file's hash for freshness. Questions live in test-plan.md
     §11 — a Q-{n} block here is a pointer only. Design rules: constitution QC-6 / QC-7. Format: the field names,
     their order and the `##` anchors below are a frozen contract parsed by skills 3c and 5 and by the HTML renderer
     (link-qc-md-to-html); never rename, drop or reorder them. Empty optional value = `—`, never blank.
     Never write a URL, username or password in a step: reference TEST-DATA-{feature}.md rows as [E{n}] environment,
     [A{n}] account, [D{n}] data item — always name + token ("Login as Administrator [A1]"). A step a person must
     perform starts with `[HUMAN] `. Live validation (skill 3c at /speckit.implement) later patches only Validation,
     the evidence stamps, label wording, inserted reveal / wait / trigger steps, the three header lines it owns,
     ## Enhancement Log, ## Potential Bugs, ## Open Questions and the reviewer buckets. -->
# Test Cases — {feature}
**Status:** APPROVED — via test-plan.md Approval Record ({YYYY-MM-DD}, {QC Lead})
**Scope:** {one sentence — what these test cases cover; the page subtitle}
**Generated:** {YYYY-MM-DD}
**Review page language:** English — see TC-REVIEW-{feature}.html
**Entry case:** expanded from test-plan.md §4
**Implementation status:** {Implemented | Partially implemented | Not implemented | Cannot be validated} — {source: plan / team answer / not yet checked live}
**Requirement IDs covered:** {US1-AC1, US1-AC2, FR-001, …}
**Total test cases:** {N} ({happy}/{edge}/{negative}, per locale)
**Run-stage mapping:** happy-path + edge-case → @positive · rejection/guard assertions → @negative
**Patterns applied / skipped:** {P1 reveal first, P2 async wait, P3 explicit trigger; P4 skipped (no tab state) | —}
**MCP validation:** 0 validated / 0 enhanced / 0 inferred / 0 discrepancy / {n} not-implemented / {N-n} draft — not app-validated (live validation runs at /speckit.implement with link-qc-3c-validate-manual-test-cases-cli)
**App validation progress:** 0/{N} TCs observed live (0%)
**Smoke TCs:** {S}
**Automation candidates:** {A}
**Requirement coverage (weighted):** {x}% — Full {f} / Partial {p} / None {n} of {ACs} acceptance criteria
**Manual-only scenarios:** {M} (High {h} · Medium {m} · Low {l})
**Tag convention:** {tags every TC carries | —}

<!-- Every header count must equal the tables below; the renderer recomputes them and reports MISMATCH otherwise.
     "MCP validation" is the legacy header name read by the renderer and the skills; after live validation it ends
     "— by 3c on {date}, env {name}, scope full, tool cli". -->

## Summary
| ID | Type | Locale | Requirement | Stage | Smoke | Automation Candidate | Data effect | Shared data | Tags | Validation | Description |
|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-LOGIN-001 | happy-path | en | US1-AC1, FR-001 | @positive | YES | YES | read-only | — | — | draft — not app-validated | User signs in with valid credentials |

## Test Cases

### TC-LOGIN-001 — User signs in with valid credentials
- **Type:** happy-path
- **Locale:** en
- **Requirement:** US1-AC1, FR-001
- **Stage:** @positive
- **Preconditions:**
  1. The sign-in page of the portal [E1] is open and fully loaded (no spinner); page language English.
- **Steps:**
  1. Type the email of the Standard user [A1] in "Email" — the field shows the typed value.
  2. Type the password of [A1] in "Password" — the field shows masked characters.
  3. Click "Sign in" — a loading indicator appears on the button.
  4. Wait until the loading indicator clears and the dashboard heading "Dashboard" is visible.
- **Expected Result:** The dashboard opens and the header shows the display name of [A1].
- **Data Oracle:** account [A1] — display name "QA User" | —
- **Smoke:** YES
- **Automation Candidate:** YES
- **Data effect:** read-only
- **Shared data:** —
- **Tags:** —
- **Validation:** draft — not app-validated

<!-- Field order is frozen: Type (happy-path | edge-case | negative), Locale, Requirement (Spec Kit IDs: USn-ACm,
     FR-nnn, SC-nnn, edge-case ids), Stage (@positive | @negative), Preconditions, Steps, Expected Result,
     Data Oracle, Smoke (YES | NO), Automation Candidate (YES | NO), Data effect (read-only | creates | modifies |
     deletes | —), Shared data, Tags, Validation (validated | enhanced | inferred | discrepancy |
     not-implemented — pending implementation | draft — not app-validated[ (reason)]).
     Every step: action verb + logical target with its display label (every required locale) + value or outcome +
     inline assertion. Loading = two steps (appears; clears and content ready). A secondary-locale variant copies the
     TC with ID suffix "b", Locale "ar" (or the configured code), labels captured live or "(Arabic label: to be
     captured live)", and a first step confirming page language and text direction.
     Live validation appends after a TC it observed:
<!- - tc-evidence
validated-on: YYYY-MM-DD
env: {environment}
build: {version | unknown}
scope: full-tail
tool: cli
outcome-check: {what was looked at → what it showed | human step pending}
content-sha256: {…}
req-sha256: {…}
open-questions: {Q-ids | —}
checked-in-run: YYYY-MM-DD
- ->  -->

## Enhancement Log
| TC-ID | Validation | What changed | Why (what the app showed) | Run |
|---|---|---|---|---|

empty until live validation runs

## Traceability Matrix
| Acceptance criterion | REQ-ID | TC-IDs | Status | Missing |
|---|---|---|---|---|
| US1-AC1 {short name} | FR-001 | TC-LOGIN-001 | Fully Covered | — |

<!-- REQ-ID column carries the Spec Kit requirement id (FR-nnn / SC-nnn) the acceptance criterion traces to. -->

## Negative Coverage
| Negative category | Covered by | Status |
|---|---|---|
| Invalid input | {TC-IDs} | {COVERED | N/A — reason} |
| Boundary | {TC-IDs} | {COVERED | N/A — reason} |
| Missing required | {TC-IDs} | {COVERED | N/A — reason} |
| Unauthorized | {TC-IDs} | {COVERED | N/A — reason} |
| Error recovery | {TC-IDs} | {COVERED | N/A — reason} |

## Standards Alignment
| Standard item | Status | TC-IDs |
|---|---|---|
| {constitution check the plan requires, e.g. QC-12 loading indicator asserted} | {COVERED | GAP | N/A} | {TC-IDs} |

## Requirement Coverage Score
| AC | REQ-ID | TC-IDs | Status | What is missing |
|---|---|---|---|---|
| US1-AC1 {short name} | FR-001 | TC-LOGIN-001 | Fully Covered | — |

<!-- Status: Fully Covered | Partially Covered | Not Covered; weighted = (full + 0.5 × partial) / ACs (QC-11). -->

## Manual-Only Scenarios
| Category | TC-ID | Scenario | Why manual | Priority |
|---|---|---|---|---|

<!-- One row per Automation Candidate NO TC (and per not-implemented TC). Category: Permission / Unauthorized ·
     Empty State · System / Background-Job Triggered · Display / Field Presence · Cross-Role Specific ·
     Per-Row Enumeration & Identity · Visual / UX judgement · Data setup not reproducible · Human-observed step ·
     Pending implementation. Priority High | Medium | Low (QC-6). -->

## Potential Bugs

none — written only by live validation

<!-- Live validation adds, per observed contradiction (five visible lines):
### PB-{n} — {title}
- **Test case:** TC-…
- **Steps to reproduce:**
  1. …
- **Expected result:** {copied from the TC, never rewritten}
- **Actual result:** {what the application did}
<!- - pb-meta: first-seen: {date}; last-checked: {date}; env: {E}; build: {b}; status: open | resolved {date} | not-checked-this-run; screenshot: evidence/PB-{n}-{date}.png - ->
     Each PB becomes a defect for the developer (QC-14) and is fixed before the branch is pushed. -->

## Open Questions

none

<!-- Questions are asked and answered in test-plan.md §11 only. List here, as pointers, only the ones that affect
     these TCs:
### Q-{n} — {short title}
- **Test plan:** test-plan.md §11.1 Q-{n}
- **Affected TCs:** TC-…
- **Status:** {Decided by agent | Answered} — no Q may be Open when this file is written. -->

## Open Findings for the Human Reviewer
### Requirement / coverage gaps
- None
### Application defects (discrepancies)
- None — not app-validated
### Pending implementation
- None
### Environment blockers
- None
### Unclear requirements
- None
