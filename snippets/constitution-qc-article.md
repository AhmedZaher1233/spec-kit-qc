<!-- Merge into .specify/memory/constitution.md with /speckit.constitution.
     Policy condensed from the supplied Link testing foundation/QA/release standards.
     Feature plans record applicability, implementation choices and execution evidence. -->

### Article: Quality Control

1. **Authority.** This article is the sole QC policy and project-configuration authority.
   No separate steering or project-config file is required. Feature specs define business
   outcomes; learning notes and observed code cannot override them. Review follows clarify.
   Preserve user scope, approved artifacts and existing project conventions.
2. **Applicability.** Declare project surfaces and change mode. Web, native, services, data,
   libraries, infrastructure and other deliverables use appropriate checks/tools/evidence.
   Hybrid products need per-surface and cross-surface coverage. Missing relevant capability is
   BLOCKED, not N/A. Justified N/A is allowed only when the behavior/category does not apply.
   Scale planning detail to risk without dropping required evidence or silently reducing policy.
3. **Readiness and ownership.** Before development, require reviewed outcomes, a proportionate
   QC plan, approved case/check designs and planned testability/data dependencies. Actual build,
   credentials, deployed targets and passing runs are execution prerequisites, not development
   prerequisites. Name owners for test layers, data/environments, triage and release. Reuse valid
   existing tests; developers normally own lower levels, QC owns acceptance strategy and sign-off
   coordination. Avoid duplicate suites solely because a different team wrote them.
4. **Traceability and approvals.** Map every in-scope FR/SC/AC/edge case and applicable policy
   check to test evidence. Record sources, versions and design approval hashes. Check current
   scope/approvals on every gate; edits invalidate affected approvals/results. Never manufacture
   human approval, infer PASS from tool success, or treat unknown requirements as accepted.
5. **Design and automation.** Use Link review/design skills with local files. Optional live
   browser validation uses CLI skill 3c with no MCP fallback; it cannot validate native/backend
   surfaces by assumption. Plan feature-specific approach, reuse/file boundaries, prerequisites,
   data lifecycle, oracles and work order. Use Link skill 5 for supported browser automation;
   use the approved repository runner or manual checks elsewhere. Missing tools remain visible.
6. **Test quality and data.** Tests accompany changes and verify observable behavior with
   meaningful assertions, clear arrange/act/assert, isolation and bounded readiness checks.
   Prefer fast lower-level tests where they give equivalent confidence; pyramid percentages
   are guidance, not a quota. Include applicable boundaries, negative/error/recovery, role/
   tenant and concurrency cases. Use synthetic/anonymized data, builders where useful, unique
   ownership for mutations and cleanup/recovery after evidence; no production PII or secrets
   in deliverables. Do not provision away the behavior under test.
7. **Coverage.** For applicable owned executable layers, measure line and branch coverage:
   domain/utilities 90%, services 80%, API/frontend 70%, infrastructure/adapters 60% minimum.
   Report instrumentation limits, generated-code exclusions and inherited gaps explicitly with
   owners/approved remediation; no fabricated percentages for unmeasurable/non-code work.
   Define enforcement mode and meaningful target per selected tool. Keep design coverage,
   automation implementation coverage and execution outcomes separate. Denominator zero is
   N/A with reason, not 100%. Current in-scope ACs require passing evidence before release.
8. **Checks and environments.** Plan applicable functionality/contracts, integrity, security,
   compatibility, reliability/recovery, performance, observability, smoke and regression.
   UI work adds platform-appropriate usability/accessibility; browser responsive/cross-browser
   and web metrics apply only to browser scope. Cover configured locales and relevant variants.
   Use actual environment/artifact IDs; QC/STG are examples, not required environments.
   Load/stress and active security work require an authorized isolated nonproduction target;
   production is non-mutating smoke-only here. Record parity and environment blockers.
9. **Execution and evidence.** Preserve original scope, all required variants/attempts, failures,
   retests, data/config/build identity, diagnostics and cleanup. Link Playwright needs its
   current A/B checkpoints and evidence; other runners need their own pre/post-run review and
   appropriate results. Manual-only automation is N/A, never PASS. Required skips, zero-test
   runs, unobserved/HUMAN outcomes and stale evidence do not satisfy acceptance.
   Keep reports local; Azure publishing and synchronization are excluded.
10. **Release and CI.** Schedule applicable fast checks/scans on change/PR, impacted regression
    and integration before promotion, and broader verification at release; define the concrete
    pipeline in the plan. Relevant failures block promotion. Execute a smoke/install/invocation
    check after deployment/delivery as appropriate. Release requires all mandatory in-scope
    checks/ACs and regression passing, required SLAs met, zero Critical/High or P1/P2 defects,
    zero Critical/High security findings, and no Critical/Serious accessibility violations
    where applicable. QC lead and named release owner approve evidenced GO/NO-GO.
11. **Exceptions and defects.** Defects need source expectation, actual result, reproduction,
    impact/severity/priority, target/build and evidence. Separate product, automation and
    environment failures; define triage/retest owners. Policy exceptions need Engineering Lead
    approval, scope/reason/risk/owner/expiry; permitted Medium/Low deferrals need QC/release-owner
    approval and remediation dates. Exceptions cannot waive the release floor, relabel missing
    evidence as N/A or accept an undefined expected result. Scope changes go through the spec.

#### QC project configuration

QC lead completes relevant groups with actual values or N/A with reason. Pending values name
an owner and due phase; only dependent work is blocked. Record approval/review date.
Feature-specific targets, worklists and results live in test-plan.md, not another policy file.

| Group | Required decisions |
|---|---|
| Profile / owners | DOMAIN_CONTEXT; surfaces/project types; change modes; test/data/environment/triage/release owners |
| Execution | Supported runner(s), capabilities and lifecycle; environment IDs/purpose; build/artifact/config identifiers; account/secret references |
| Compatibility / locales | Supported runtime/OS/device/browser versions as applicable; LANGUAGES/direction and locale formats only where used |
| Performance / resilience | Applicable latency/throughput/volume/resource/recovery metrics, percentiles, load model, targets and measurement conditions |
| Web baseline (browser scope only) | Supplied Link targets: LCP <2.5s, INP <100ms, CLS <0.1, TTFB <800ms, FCP <1.8s; Lighthouse performance ≥85, accessibility/best-practices ≥90, SEO ≥80 where SEO applies; record approved applicability |
| Security / accessibility | Threat/access/privacy scope; session/MFA/upload limits where applicable; platform accessibility target (Link web baseline WCAG 2.1 AA); scan authorization |
| Coverage / CI | Applicable layer thresholds, enforcement/instrumentation/exclusions, automation target/denominator, regression selection, evidence retention, visual checks if relevant |
| Approval | Configuration status, approved by/date, owners/due phase for pending decisions |

The web values preserve supplied team targets; they are not universal measures for every project.
