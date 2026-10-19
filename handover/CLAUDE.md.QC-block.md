## Quality Control

- QC policy and configuration: the `## Quality Control` section of `.specify/memory/constitution.md` (QC-1 … QC-18). Nothing else.
- Test design is the `## Testing` section of `specs/<NNN-feature>/plan.md`; detailed cases and their test data (`## Test Data` section) are `specs/<NNN-feature>/TEST-CASES-<NNN-feature>.md` (template in `.specify/templates/`). Only the QC Lead sets `**Status:** APPROVED`.
- Automation: skill `link-qc-5-test-run-automation` on the APPROVED document (`ado_mode: local`, `qa_standards: .specify/memory/constitution.md`); HTML pages only through skill `link-qc-md-to-html`.
- Secrets only by name (`E{n}_URL`, `A{n}_USER` / `A{n}_PASSWORD`); test cases reference `[E]/[A]/[D]` rows, never URLs, usernames or selectors.
