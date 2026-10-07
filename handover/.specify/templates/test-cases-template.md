<!-- TEST-CASES-{feature}.md — written by the Phase 2 Foundational task of tasks.md from plan.md ## Testing, one
     test case per high-level row (TC-ID, Type, Locale, Smoke, Automation Candidate, Data effect and Shared data
     copied unchanged; scope changes go back to plan.md ## Testing). Design rules: constitution QC-6 / QC-7.
     Approval (QC-3): the file is written with Status PENDING QC REVIEW; only the QC Lead changes it to
     "APPROVED — {name}, {date}" after reviewing the rendered page; the automation skill runs only on APPROVED.
     Format: the field names, their order and the `##` anchors below are a frozen contract parsed by skill
     link-qc-5-test-run-automation and by the HTML renderer (link-qc-md-to-html); never rename, drop or reorder
     them. Empty optional value = `—`, never blank. Never write a URL, username or password in a step: reference
     TEST-DATA-{feature}.md rows as [E{n}] environment, [A{n}] account, [D{n}] data item — always name + token
     ("Login as Administrator [A1]"). A step a person must perform starts with `[HUMAN] `.
     Corrections found during implementation (QC-8) patch wording only and add one ## Enhancement Log row. -->
# Test Cases — {feature}
**Status:** PENDING QC REVIEW
**Scope:** {one sentence — what these test cases cover; the page subtitle}
**Generated:** {YYYY-MM-DD}
**Source:** plan.md `## Testing` ({YYYY-MM-DD})
**Requirement IDs covered:** {US1-AC1, US1-AC2, FR-001, …}
**Total test cases:** {N} ({happy}/{edge}/{negative}, per locale)
**Run-stage mapping:** happy-path + edge-case → @positive · rejection/guard assertions → @negative
**Patterns applied / skipped:** {P1 reveal first, P2 async wait, P3 explicit trigger; P4 skipped (no tab state) | —}
**Smoke TCs:** {S}
**Automation candidates:** {A}
**Requirement coverage (weighted):** {x}% — Full {f} / Partial {p} / None {n} of {ACs} acceptance criteria
**Manual-only scenarios:** {M} (High {h} · Medium {m} · Low {l})
**Tag convention:** {tags every TC carries | —}

<!-- Every header count must equal the tables below; the renderer recomputes them and reports MISMATCH otherwise.
     After approval the first line reads exactly: **Status:** APPROVED — {QC Lead}, {YYYY-MM-DD} -->

## Summary
| ID | Type | Locale | Requirement | Stage | Smoke | Automation Candidate | Data effect | Shared data | Tags | Description |
|---|---|---|---|---|---|---|---|---|---|---|
| TC-LOGIN-001 | happy-path | en | US1-AC1, FR-001 | @positive | YES | YES | read-only | — | — | User signs in with valid credentials |

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

<!-- Field order is frozen: Type (happy-path | edge-case | negative), Locale, Requirement (Spec Kit IDs: USn-ACm,
     FR-nnn, SC-nnn, edge-case ids), Stage (@positive | @negative), Preconditions, Steps, Expected Result,
     Data Oracle, Smoke (YES | NO), Automation Candidate (YES | NO), Data effect (read-only | creates | modifies |
     deletes | —), Shared data, Tags.
     Every step: action verb + logical target with its display label (every required locale) + value or outcome +
     inline assertion. Loading = two steps (appears; clears and content ready). A secondary-locale variant copies the
     TC with ID suffix "b", Locale "ar" (or the configured code), labels written as "(label: to be confirmed)" until
     observed, and a first step confirming page language and text direction. -->

## Enhancement Log
| TC-ID | What changed | Why (what the application showed) | Run / date |
|---|---|---|---|

none yet — corrections found during implementation are appended here (QC-8)

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

<!-- One row per Automation Candidate NO TC. Category: Permission / Unauthorized · Empty State · System /
     Background-Job Triggered · Display / Field Presence · Cross-Role Specific · Per-Row Enumeration & Identity ·
     Visual / UX judgement · Data setup not reproducible · Human-observed step · Pending implementation.
     Priority High | Medium | Low (QC-6). -->

## Execution Results
| TC-ID | Run / date | Build | Result | Tester | Evidence | Note |
|---|---|---|---|---|---|---|

<!-- Manual execution only (QC-13): one row per case and run, Result = PASS | FAIL | BLOCKED | NOT RUN | N/A — reason,
     PASS only in every configured language. Automated results live in the run report the automation skill writes
     (TEST-RUN-REPORT-{feature}.md); link it in the first row's Note. TABLE ROWS ONLY — never a `### TC-…` heading
     in this section. -->

## Potential Bugs

none

<!-- Defects found during manual execution are filed in BUG-REPORT-{feature}.md (QC-14) when the automation skill
     already created it; otherwise record them here, five visible lines each, and file them later:
### PB-{n} — {The system doesn't … when …}
- **Test case:** TC-…
- **Steps to reproduce:**
  1. …
- **Expected result:** {copied from the TC, never rewritten}
- **Actual result:** {what the application did}
-->

## Open Questions

none

<!-- Questions are asked and answered in plan.md ## Testing (NEEDS CLARIFICATION → research.md) or, for business
     rules, through /speckit.clarify. List here, as pointers, only the ones that affect these TCs:
### Q-{n} — {short title}
- **Where:** research.md "{decision title}" | spec.md ## Clarifications {date}
- **Affected TCs:** TC-…
- **Status:** Decided — none may be open when this file is written. -->

## Open Findings for the Human Reviewer
### Requirement / coverage gaps
- None
### Application defects
- None
### Pending implementation
- None
### Environment blockers
- None
### Unclear requirements
- None
