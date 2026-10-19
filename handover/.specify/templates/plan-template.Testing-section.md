## Testing

<!--
  ACTION REQUIRED: Fill every subsection below from spec.md (user stories, acceptance scenarios,
  FR-### / SC-### ids, edge cases) and the constitution's "Quality Control" section (QC-3 … QC-7,
  QC-9, QC-11, QC-12). This section is a Constitution Check item (QC-3). Keep it to design
  decisions: the detailed test cases are written later, in Phase 2 of tasks.md, from this section.

  Any testing unknown MUST be written here as "NEEDS CLARIFICATION: …" AND repeated as a bullet
  under **Testing** in Technical Context, so Phase 0 research resolves it in research.md; then
  record the decision here and remove the marker. Business-rule questions go to /speckit.clarify.
-->

**Story risk** (QC-5): [US1 — High | Medium | Low — reason; US2 — …]

**Traceability** (QC-4) — every acceptance scenario, FR and SC in scope maps to at least one TC-ID:

| Spec ID (USn-ACm / FR-### / SC-### / edge case) | TC-IDs | Notes |
|---|---|---|
| [US1-AC1 — short name] | [TC-AREA-001] | [—] |

**High-level test cases** (QC-6) — titles only; one happy path per acceptance scenario, one edge case per user-facing input, one negative case per guarded action; secondary-locale variants append `b`:

| TC-ID | Title (observable outcome) | Type (happy-path / edge-case / negative) | Locale | Smoke (YES/NO) | Automation Candidate (YES/NO — reason if NO) | Data effect (read-only / creates / modifies / deletes) | Shared data |
|---|---|---|---|---|---|---|---|
| [TC-AREA-001] | [User signs in with valid credentials] | [happy-path] | [en] | [YES] | [YES] | [read-only] | [—] |

Negative categories covered or N/A with reason: invalid input [TC / N/A], boundary [TC / N/A], missing required [TC / N/A], unauthorised [TC / N/A], error recovery [TC / N/A]. Techniques and interaction patterns applied: [EP / BVA / decision table / state transition; reveal / wait / trigger / loading two-step].

**Test data** (QC-7) — by reference only; never a URL, username or password:

| Ref | What | Source / status |
|---|---|---|
| [E1] | [application base URL — local build] | [secret name E1_URL; UNKNOWN until the run] |
| [A1] | [role, e.g. Standard user] | [secret names A1_USER / A1_PASSWORD; UNKNOWN] |
| [D1] | [data item in plain words and what it must look like] | [e2e scenario / api (to be confirmed) / manual; UNKNOWN] |

**Automation approach** (QC-9, QC-11): [browser surface → Playwright automation with skill link-qc-5-test-run-automation for the Automation Candidate YES cases; API → repository runner `<command>`; manual-only → TC-IDs with reason]. Reuse / extend / create decision for the automation root: [existing project at `<path>` reused | new project under AUTOMATION_ROOT]. Coverage target and enforcement: [from the constitution configuration table].

**Developer testability asks** (QC-3): [stable test ids on …; observable interface for … (job result, mail sandbox, download); isolated seed / cleanup hook for …; test accounts on the local build via secret names; LOCAL_RUN_COMMAND / health endpoint] — each becomes a task inside its user story.

**Open questions**: [none | NEEDS CLARIFICATION: … (also listed under Technical Context → Testing)]

**QC review**: optional `checklists/testing.md` (`/speckit.checklist testing`); the detailed test cases are approved separately by the QC Lead (constitution QC-3).
