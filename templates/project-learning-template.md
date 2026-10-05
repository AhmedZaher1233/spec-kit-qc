# Project Learning — [PROJECT_NAME]
<!-- Shared knowledge base read by every QC step and skill (constitution QC-1): read before asking;
     write back only confirmed facts, one tagged line each, with source and date. Never a credential,
     token or secret. spec.md and the constitution always win over this file. -->

## Index
| Module | Pages | Similar to | Sections that mention it |
|---|---|---|---|

## Project Knowledge
<!-- system overview, environments (purpose + build identity, URLs by [E{n}] token), roles, modules,
     business rules learned (each with the spec/clarification that confirmed it), glossary.
     Out-of-browser test interfaces, one [type: env] line per environment and channel, e.g.
- [module: Project] [type: env] Test interfaces on staging: mail sandbox available (reads OTP / notification mail); SMS test provider: none. (confirmed by user 2026-09-02) -->

## Common Flows
<!-- how to reach each screen: sign in → menu → page → panel; walked live on {date} by {tool} -->

## UI Knowledge
<!-- how controls behave: waits, dialogs, validation messages, sorting, paging, loading indicators -->

## Test Data
<!-- seeded entities, valid / invalid samples, boundaries — no credentials. One fixture per line, e.g.
- [module: Orders] [type: data] Fixture "Price list Sample 2026" — 12 line items, ids 401-412, status Approved; environment staging; created by api on 2026-09-02, kept. -->

## Locale Knowledge
<!-- label differences per language, RTL quirks, date / number / phone formats as observed -->

## Automation Tricks
<!-- how elements are identified, waits that work, environment quirks, run slicing, VPN / proxy notes -->

## Model Notes

### Planning Model (/speckit.plan test plan)
#### Knowledge
<!-- answers to test-plan open questions that are generic project facts (never a one-feature decision) -->
#### Questions and Answers

### Test Design Model (/speckit.tasks test cases)
#### Knowledge
<!-- implementation status as stated by the team, tag convention, which stories share flows -->
#### Questions and Answers

### CLI Validation Model (skill 3c)
#### Knowledge
<!-- base URL per environment (never a credential), login method per environment (attended / secrets file — a name, never a value), common flows walked live, where the app shows its build number -->
#### Questions and Answers

### Automation Model (skill 5)
#### Knowledge
<!-- pages that already have page objects (page names only), how to run, environment presets, heal patterns -->
#### Questions and Answers

### UI Visual QA Model (skill 6)
#### Knowledge
<!-- locales the product ships, which screens have an approved design and where, role each screen is audited as -->
#### Questions and Answers
