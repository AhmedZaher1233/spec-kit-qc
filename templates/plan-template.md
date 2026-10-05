
<!-- Appended to the core plan template by the "qc" preset (strategy: append). /speckit.plan fills
     this section in the same run that writes test-plan.md (constitution QC-18). Keep it short:
     the decisions live in test-plan.md; this section tells the developer what testing the feature
     gets and what the implementation must provide for it. -->

## Testing Strategy *(QC)*

- **Test plan**: `specs/[###-feature]/test-plan.md` — Status [PENDING QC LEAD APPROVAL | APPROVED date]; the single QC review point
- **Surfaces / change mode**: [browser / API / native / data … ; new / enhancement / bugfix …]
- **High-level test cases**: [N] ([S] smoke · [A] automation candidates · [M] manual-only) — see test-plan.md §4
- **Execution routes** (test-plan.md §8.1): [link-playwright for …; project-runner (`<runner>`) for …; manual-only for …]
- **Local run for validation**: [command / URL the implementation exposes locally; seed or fixture needed]
- **Developer-owned tests**: [unit / component / integration suites and where they live; coverage floors per constitution]
- **Open questions**: [o] open · [d] decided by agent · [a] answered — none may remain Open before /speckit.tasks

## QC Requirements for Development

<!-- Copied from test-plan.md §9: concrete testability asks the implementation must deliver.
     /speckit.tasks turns each row into a task in the "Testability & QC Handover" phase. -->

| Need | Concrete change | Owner | Due phase |
|---|---|---|---|
| [stable test IDs on …] | | | |
| [observable interface for … (job result, email sandbox, download)] | | | |
| [isolated seed / cleanup hook for …] | | | |
| [test accounts / roles via secret names A{n}_USER / A{n}_PASSWORD] | | | |
| [local run script / health endpoint for validation] | | | |
