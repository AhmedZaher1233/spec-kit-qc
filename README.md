# Spec Kit QC — team workflow v2.2

A profile-based QC extension for the team's projects. It combines requirement review, case
design, automation planning, execution evidence and release decisions. The workflow applies to
browser, service, native, data, library/CLI, infrastructure, AI and manual/content work; the
execution tools depend on the actual project. Bundled Link browser skills are not universal
native or backend test runners.

The constitution's Quality Control article is the only policy/configuration authority.
[Project profiles](references/project-profiles.md) select applicability and routes.
[Integration rules](references/skill-integration.md) adapt the Link skills without changing their
canonical source. Results remain local; Azure publication/synchronization stays excluded.

## Workflow

```text
One-time: constitution QC article → qc.setup (profile, capabilities, paths)

specify → clarify → qc.review
                      └─ open business questions → clarify → review again
plan → qc.plan → tasks → qc.tcs → human plan/case approval
analyze → qc.gate → implement
  optional browser TC validation: qc.validate (CLI 3c only when applicable)
  selected automated targets: qc.automate → qc.review-automation
  designated environment/artifact: qc.run-env <environment-id>
  manual + automated evidence: qc.execute → actual human GO / NO-GO
```

Manual-only scope goes directly to planned human execution; automation is N/A, not PASS.
Environment names/phases are project-defined; a package/job/device may have no website or
deployment. Reuse current evidence across phases only when build/config/data/scope match.
Converge, if installed, checks implementation completeness; otherwise record explicit evidence.
It is not proof that tests passed.

## Commands and execution routes

| Command | Responsibility |
|---|---|
| /speckit.qc.setup | Inspect profile/capabilities, select required skills, configure paths/policy aliases |
| /speckit.qc.review | Link skill 2 reviews clarified local requirements |
| /speckit.qc.plan | Risk/ownership/scope/regression + feasible feature automation design |
| /speckit.qc.tcs | Link skill 3 designs cases/data requirements; no live browser |
| /speckit.qc.gate | Current development readiness, design approval and traceability |
| /speckit.qc.validate | Optional browser TC validation via Link CLI skill 3c |
| /speckit.qc.automate | Implement/run approved work using selected Link or project runner |
| /speckit.qc.review-automation | Appropriate code/readiness/results review for that runner |
| /speckit.qc.run-env | Run reviewed scope on an actual configured target/environment |
| /speckit.qc.execute | Collect human/automated evidence and assess release readiness |

- **link-playwright**: supported browser automation with skill 5, its config/POM/evidence and
  Checkpoints A/B. Every invocation passes `ado_mode: local`, even if old mappings exist.
- **project-runner**: the repository's verified toolchain for API, native, data, library or other
  automation. Record config, scoped commands, working directory and native/local result mapping.
  Missing tooling/access is BLOCKED; no promised integration or automatic framework install.
- **manual-only**: named tester, approved procedures and real evidence; no fabricated suite.
- **unresolved**: an explicit decision owner/deadline; dependent execution cannot proceed.

API-only work normally uses project-runner. Link API-only capability must be verified in the
installed skill before selecting it; the framework's HTTP support alone is insufficient.
Hybrid products use multiple routes and cross-surface traceability. Review/TC design still use
the agreed four-skill family: 2, 3, 3c and 5, with browser-only skills installed only when needed.
White-box and business-rule discovery remain removed.
For new projects, plan the runner/configuration/dependencies with a named setup owner. Proposed
commands become executable only after actual configuration verifies them. An existing runner is
preferred where suitable; its absence does not prevent designing a new project's test strategy.

## Install and configure

The supplied skill registration examples target Claude Code. Other hosts need verified skill
format/tool support and adapted registration; the general QC documents do not prove host
compatibility. Use the team's compatible pinned Spec Kit release. No Azure connection is needed.

1. In an initialized Spec Kit project, install from the folder containing extension.yml:

   ```sh
   specify extension add qc --dev ./spec-kit-qc
   specify extension list
   ```

   Replace the path with your extension checkout. Reload the agent. There are 10 commands and
   five hooks. Installation/hook details are in the
   [official extension guide](https://github.com/github/spec-kit/blob/main/extensions/EXTENSION-DEVELOPMENT-GUIDE.md).

2. Merge `snippets/constitution-qc-article.md` with `/speckit.constitution`, preserving the
   existing constitution. Confirm relevant values/owners; N/A needs a reason and pending values
   name a due phase. Do not create separate steering/project-config files.

3. Run `/speckit.qc.setup <local-Link-skills-directory>`. It inspects the stack and reuses
   existing runners/QA paths. Review/design are common; select 3c/5 only for their supported
   browser scope. Claude Code's default skills path is .claude/skills; it is configurable.
   Setup protects local edits and validates copied metadata. If the source review skill still
   has an invalid unquoted description, quote the identical text in the installed copy only.

4. If using the team's skill sync command, select only needed skill folders. For a browser project:

   ```text
   /sync-skills link-qc-2-review-requirements link-qc-3-generate-manual-test-cases link-qc-3c-validate-manual-test-cases-cli link-qc-5-test-run-automation
   ```

   Non-browser review/design need only the first two. Preserve local-change protections; do not
   run unrestricted sync. Add --tools only when its optional installations are intended.
   Re-run qc.setup after updates. The generic foundation repair would recreate policy layers,
   so it is not this extension's setup path.

5. Verify only selected tools. Browser validation probes playwright-cli then its no-install
   local invocation; no MCP fallback. Other routes use existing runner/runtime requirements.
   Node/browser dependencies are not universal prerequisites for every project.

6. Merge optional plan/tasks snippets into template overrides, preserving current customizations.
   Create only applicable development asks. Configure actual environment/artifact IDs and secret
   references; never copy passwords into documents or commands.

## QC planning and management

The [test-plan template](templates/test-plan-template.md) retains sections 1–9. Small changes may
use concise rows; complex changes need enough detail to make scope and feasibility reviewable.

| Section | Management decision |
|---|---|
| 1–2 | Profile/change mode, in/out scope, impact/risk, ownership, effort/access and applicable checks |
| 3–4 | Source-to-case traceability, distinct coverage denominators, baseline debt and regression selection |
| 5–6 | Actual environment/artifact readiness, variants and named human execution |
| 7 | Feature-specific automation route, reuse/files, prerequisites, data lifecycle, assertions/evidence, work order and maintenance |
| 8–9 | Developer dependencies, phased readiness, suspend/resume, triage/retest and release conditions |

qc.plan consumes implementation details only to choose HOW; requirements decide expected outcomes.
qc.tcs reconciles actual TC/data references before final approval. Development entry does not
require a deployed app, final account access or completed automation. Execution entry does.
Valid existing dev-owned tests are reused with an accountable owner, not duplicated as QC tests.

## Artifacts and steering references

| Artifact | Location |
|---|---|
| QC policy/project values | .specify/memory/constitution.md |
| Routing and host configuration | Testing/qa-manifest.json; extension-owned qc profile/targets |
| Review/inventory/source hashes | specs/NNN-feature/qc-review.md |
| Feature plan/design approval/run links | specs/NNN-feature/test-plan.md |
| Final evidence/decision | specs/NNN-feature/qc-signoff.md |
| Requirements / cases | Manifest paths under SPEC-NNN-feature/US-id-name |
| Automation/native output/local summaries | Per-target paths/configuration |
| Reusable knowledge | Manifest learningFile |

All occurrences of steering are intentional compatibility/provenance or no-steering instructions.
Legacy manifest keys `steering.readme/L1/L2/L3` all point to the constitution; `steering.dir`
is its parent. Deduplicate the file, do not search for/install four layers, and do not run repair
against that parent. The constitution has actual policy values; aliases alone do not supply them.
Keep these keys until the upstream skills no longer expect them. The `qc` metadata belongs to
this extension, not to an assumed upstream schema. See the [review findings](QC-SKILLS-VS-SPECKIT-REVIEW.md).

## Hooks and upgrade

Merge or replace only this extension's hook entries; preserve others and avoid duplicates:

```yaml
hooks:
  after_clarify:
    - {extension: qc, command: speckit.qc.review, enabled: true, optional: false}
  after_plan:
    - {extension: qc, command: speckit.qc.plan, enabled: true, optional: false}
  after_tasks:
    - {extension: qc, command: speckit.qc.tcs, enabled: true, optional: true, prompt: "Design test cases now?"}
  before_implement:
    - {extension: qc, command: speckit.qc.gate, enabled: true, optional: false}
  after_implement:
    - {extension: qc, command: speckit.qc.validate, enabled: true, optional: true, prompt: "Check applicability and validate browser TCs with CLI?"}
```

Older templates that do not dispatch after_clarify need a compatible upgrade or explicit
qc.review after clarify. Hook prompts are agent instructions, not hard server-side enforcement.

From v2.1, fill the profile/target routing and refresh existing plans using the revised template;
retain all prior evidence and approvals as history. Reuse known framework values; do not replace
them with unresolved template placeholders. Review design changes and renew approval as needed.
From v2.0, also remove obsolete installed publication registrations/instructions. Preserve external
records, mappings and shared skill libraries. From v1.1, remove the old QC after_specify hook.
Historical standalone policy files may remain but are no longer inputs.
