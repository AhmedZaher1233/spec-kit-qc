# Team QC kit review — v2.2

Reviewed and edited on 2026-09-29 from the AI workflow, automation manager and QC manager
perspectives. This is an implementation review record, not another project policy source.

## Findings addressed

| ID / severity | Perspective | Finding | Applied correction |
|---|---|---|---|
| R01 High | AI workflow | The kit claimed broad reuse while commands always chose browser/Playwright | Project/surface profiles and explicit supported-Link, existing-runner and manual routes |
| R02 High | AI workflow | A native/API project could be blocked by missing playwright-cli | Applicability before tool probe; unavailable relevant tool BLOCKED, irrelevant tool N/A |
| R03 High | Automation | Fixed QC/STG URLs and web evidence did not represent package/job/device execution | Configured environment/artifact identities and runner-specific evidence/results |
| R04 High | Automation | One global Playwright config/POM and checkpoints were imposed on unrelated stacks | Per-target native architecture; Link A/B only for supported Link execution |
| R05 High | QC management | Development approval risked requiring execution-ready infrastructure | Separate design/development readiness from actual run readiness and release evidence |
| R06 Medium | QC management | Plan lacked explicit resourcing, impact-based regression and triage ownership | Owners/backups, effort/access/milestones, risk response, regression selection, suspend/resume and retest |
| R07 Medium | Automation | “Best approach” did not address hybrid, data, native or nondeterministic behavior | Alternatives/rationale per behavior, cross-surface correlation and model/data evidence where relevant |
| R08 Medium | Automation | Data cleanup/retries needed clearer ownership and failure handling | Exact owned IDs, reconciliation, bounded retries, teardown/recovery and retained evidence |
| R09 Medium | QC management | Coverage denominators and zero/partial/skipped runs could mislead | Separate design/code/static/execution measures; explicit denominators; zero eligible N/A, zero tests not PASS |
| R10 Medium | AI workflow | Mandatory QC E2E ownership could duplicate a valid existing dev suite | Reuse suites and name one accountable owner per test layer |
| R11 Medium | AI workflow | Machine-specific paths and host assumptions limited team reuse | Generic setup paths, conditional tools and explicit Claude registration boundary |
| R12 Medium | AI workflow | Steering aliases might trigger upstream layer scanning/repair | Verify one constitution target, deduplicate reads, prohibit layer repair; classify all references |
| R13 Medium | QC management | Web thresholds/accessibility wording applied to all user-facing products | Apply platform checks and metric targets only to relevant surfaces; preserve supplied web baseline |
| R14 Medium | AI workflow | Prompt/data boundaries and approval claims needed explicit safeguards | Sources/logs remain data; confirmed commands and actual human decisions only |
| R15 Medium | Automation | Reuse rules could leave new projects without a valid automation path | Explicit proposed runner/config/setup work; verify actual commands before execution |

The common workflow remains specify → clarify → review → plan/design → approval → implementation
→ applicable execution → sign-off. Earlier user choices remain: CLI browser validator selected,
white-box/discovery absent, no Azure publishing/sync, constitution-only QC policy.

## Steering-reference audit

| Location | Why the reference exists | Verdict |
|---|---|---|
| templates/qa-manifest-template.json | Legacy steering.dir/readme/L1/L2/L3 fields required by existing skill consumers | Correct: all file aliases point to the constitution, not separate files |
| references/skill-integration.md | Resolves old skill policy names, precedence and aliases | Correct: reads the constitution once; forbids layer glob/install/repair |
| commands/setup.md | Validates/repairs aliases during setup | Correct: repair metadata only; never provision standalone layers |
| README.md and agent snippet | Explains setup/migration and no standalone policy dependency | Correct: operational explanation, not another policy source |
| constitution QC article | Declares sole authority and no separate steering file | Correct |
| This review record | Explains the audit and provenance | Correct; not runtime authority |

No active command requires a standalone L1/L2/L3/project-config file. Removing all occurrences
of the word steering would break the legacy manifest contract or remove useful migration
explanations. Keep the compatibility keys and no-steering instructions; keep actual project
policy/values in the constitution. New profile guidance is an operational reference only.

## Automation manager decisions

- Plan section 7 requires a feasible route and capability evidence per surface; POM is one
  conditional implementation pattern, not a project-independent architecture.
- Reuse precedes new files; native commands/configuration come from the actual repository.
- Prerequisites establish valid starting state, never exercise away the tested transition.
- Data lifecycle includes deterministic or versioned oracles, isolation, uncertain mutation
  recovery, exact cleanup ownership and evidence preservation.
- Required variants, stage ordering, polling, retries, time budget and flaky-test ownership
  remain visible; an unsupported or skipped outcome does not pass.
- Browser-specific Link compliance stays distinct from native runner pre/post-run review.
  Execution support depends on installed tools and access; the kit does not promise missing adapters.

## QC manager decisions

The template now includes change impact, risk-based depth, responsibilities, effort/access,
regression selection, applicable measurement, human coverage, defect workflow and phase gates.
Small changes can be concise; complex changes use the same structure with detailed decisions.
Coverage is scoped and measured transparently. Existing debt is recorded, not silently blessed.
The team release floor remains; evidence must match the actual release artifact/config/data,
and final approval is a real human decision.

## Verification and remaining limits

Static validation passed: the official Spec Kit ExtensionManifest validator accepted v2.2.0
with no warnings; all 10 command registrations/frontmatter and five hooks matched. Checked all
19 Markdown files, five local links, section 1–9/7.1–7.6 references, constitution aliases and the
four canonical skill paths. Both execution wrappers explicitly retain local reporting.

Workflow inspection covered browser, API-only, native, data, library/CLI, infrastructure, AI,
manual-only, hybrid and new-project routing, including missing applicable tooling versus tool
N/A. Browser scope retains 3c/Link behavior; non-browser scope selects its planned runner or
manual evidence; new tooling remains a planned dependency until delivered and verified.

These are document/manifest and workflow consistency checks. No real app, native/device lab,
data job, model evaluation or complete agent lifecycle has been executed by this review.
Claude Code remains the supplied skill integration; other hosts require compatibility work.
The source review skill's known YAML-description issue is handled only when still present,
by metadata normalization in an installed copy, never by editing the canonical repository.
