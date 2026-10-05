<!-- TEST-DATA-{feature}.md — written by /speckit.tasks together with TEST-CASES-{feature}.md, from the approved
     test-plan.md (§4 data refs, §6 environments and data, §8.3 prerequisites). Plain English for QC / PO: no
     locator names, API paths, table names or code. NEVER a password, token or other secret value — the Accounts
     table carries the NAME of the secret (environment variable / vault key) only (constitution QC-7).
     Every [E{n}] / [A{n}] / [D{n}] token in the TC document resolves to a row here; every row is used by ≥ 1 TC.
     Status: READY (confirmed to exist) · MISSING (checked live and absent — live validation or execution only) ·
     IMPOSSIBLE (cannot be created with any allowed way) · UNKNOWN (everything else). Header counts equal the rows.
     Live validation (skill 3c) patches statuses and "Environment: … checked …"; skill 5 never edits this file. -->
# Test Data — {feature}
**Story:** {US1 — title} · **TC document:** TEST-CASES-{feature}.md ({YYYY-MM-DD}) · **Environment:** not checked
**Data items:** {N} — ready {r} · missing 0 · impossible {i} · unknown {u}
**Accounts needed:** {N} accounts — {c} confirmed · {u} unknown
**Environment rows:** {N} — {r} ready · {u} unknown

## 0. Environment
| ID | What | Value | Status |
|---|---|---|---|
| E1 | application base URL (local build first, then configured environments) | {from the constitution configuration / project learning, or "unknown — asked at live validation"} | UNKNOWN |
| E2 | {e.g. mail sandbox (reads notification mail)} | {…} | UNKNOWN |

## 1. Accounts
| ID | Role | Username | Secret name | Status | Used by TCs | Note |
|---|---|---|---|---|---|---|
| A1 | {e.g. Standard user} | {username or "unknown"} | A1_USER / A1_PASSWORD | UNKNOWN | TC-LOGIN-001 | {e.g. "used for sign-in in most TCs"} |

## 2. Test data at a glance
| # | Data item (plain name) | Must look like | Used by TCs | Status | Best way to get it |
|---|---|---|---|---|---|
| D1 | {e.g. an active account with display name "QA User"} | {state, count, key values} | TC-LOGIN-001 | UNKNOWN | {e2e scenario / api (to be confirmed) / db (to be confirmed) / set directly / manual} |

## 3. Data item details
### D1 — {plain name}
- **What it is:** {one sentence}
- **Exact values needed:** {field → value, counts, identifiers — the Data Oracle values}
- **Used by:** TC-LOGIN-001
- **Where I checked:** {project learning line | not checked}
- **Status:** UNKNOWN — {one-line reason}
- **Shared with other TCs:** {no | yes — TC-… and TC-… use the same item; state order only when one TC needs another's result}

## 4. Problems — data that cannot be created or is unclear
| # | Data item | Problem | Why | What the QC / PO must decide |
|---|---|---|---|---|

## 5. How to prepare the missing data
### D1 — {plain name}  (recommended: {way})
| Way | How, in plain words | Cleanup after | Availability |
|---|---|---|---|
| e2e scenario | {run TC-… or the common flow: sign in as [A1] → open {screen} → create {entity} with {values}} | {delete it through {screen}} | available |
| api | {create it through the project's seeding API} | {delete it the same way} | {available — confirmed by … | to be confirmed} |
| db | {insert the record directly — QC needs access} | {delete the record} | {available — confirmed | to be confirmed} |
| set directly | {Admin settings → {section} → set {value}} | reset the value | available (settings only) |
| manual | QC creates it by hand following the e2e steps, then re-checks | QC decides | always available |

<!-- `api` / `db` are offered only when confirmed by the project; otherwise write "to be confirmed" and never
     recommend them. Clean up only data this feature created, after evidence, in reverse dependency order. -->

## 6. Open questions
Test-data questions are asked and answered in test-plan.md §11.3 — none are kept here.
