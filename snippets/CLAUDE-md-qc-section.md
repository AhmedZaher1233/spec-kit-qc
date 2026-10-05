<!-- Optional: merge into the project's CLAUDE.md (or the host's agent-instructions file). Everything
     here is also enforced by the constitution's Quality Control article and the wrapped commands;
     this snippet only keeps the agent oriented when it works outside a /speckit.* command. -->

## Quality Control (Spec Kit qc preset)

- Policy: the `## Quality Control` article of `.specify/memory/constitution.md` (QC-0 … QC-18) is
  the only QC policy and configuration source. No steering or standards files exist.
- Testing lives inside the Spec Kit stages: clarify = testability review; plan = `test-plan.md`
  beside `plan.md` (the single QC review, approved by the QC Lead); tasks = `TEST-CASES-<feature>.md`
  + `TEST-DATA-<feature>.md` expanded from the approved plan plus the QC phases of tasks.md;
  implement = run the app locally → live validation (skill 3c) → automation (skill 5) → fix and
  re-run → record results in test-plan.md → push.
- `spec.md` is the business oracle; answers enter it only through `/speckit.clarify`. Test-case,
  automation and test-data questions live in test-plan.md §11 and none may stay Open after plan
  approval. Never invent an expected result, an owner, a URL or a count.
- Retained skills, invoked only with explicit paths: `link-qc-3c-validate-manual-test-cases-cli`
  (live validation, `--authorize-revision`, local build first), `link-qc-5-test-run-automation`
  (`ado_mode: local`, `qa_standards: .specify/memory/constitution.md`), `link-qc-6-ui-testing`
  (optional visual audit), `link-qc-md-to-html` (every HTML page; never hand-written HTML).
- Secrets only by name (`E{n}_URL`, `A{n}_USER` / `A{n}_PASSWORD`); reference tokens
  `[E]/[A]/[D]` in test cases; no selectors or code in QC documents; reports stay local.
