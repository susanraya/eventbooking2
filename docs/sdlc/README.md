# eventbooking2 — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
basic event booking qpp

**Documentation version:** v5
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 22 entries |
| [Development](development/README.md) | 6 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 5 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 14 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 30 tests |
| [Deployment guide](deployment/deployment-guide.md) | deployed |
| [Runbook](deployment/runbook.md) | deployed |
| [Release notes](deployment/release-notes.md) | 1 release |
| [Traceability matrix](traceability-matrix.md) | 14 requirements |
| [Changelog](CHANGELOG.md) | 5 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture phase exists yet to confirm this stack has actually been translated into a system design (services, data model, deployment topology).
- Discrepancy: this services list approves SendGrid (email) and MSG91 (SMS) as in-scope runtime services with required API keys, but EPIC-006's stated assumption says 'email delivery of tickets and optional SMS notifications via an Indian provider are deferred beyond this MVP, in which tickets are viewable in-account.' It is unresolved whether email/SMS delivery of tickets is actually in scope for this MVP or deferred -- needs product owner clarification.
- NFR-006 commits to 180-day ICT log retention and 'following DPDP/CERT-In notification obligations' generically, but does not specify a concrete breach-notification process/runbook or the CERT-In 6-hour incident reporting timeline.
- NFR-013 accepts the risk of no parental-consent flow based on an unverified 'users are 18+' assumption; no age-verification mechanism is specified anywhere in requirements.
- No platform-admin moderation/suspension capability exists at this scope -- organizers can list events with zero approval gate, which is an accepted assumption but not validated against any policy requirement.
- DPDP Act: no Consent Manager mechanism (a registered, interoperable consent manager) is referenced anywhere in requirements.
- AC-013's 'downstream data-handling response to withdrawal' is explicitly left as an undefined operational assumption rather than a specified requirement.
- Significant Data Fiduciary duties (India-based DPO, audits, Data Protection Impact Assessments) are not addressed, and applicability has not been assessed for eventbooking2's expected scale.
- No automated refund or payout process exists even though payments and commissions are collected -- operational/manual handling is implied but not specified.
- Conflict: this epic's assumption states email/SMS ticket delivery is deferred beyond the MVP, but REQ-SERVICES approves and requires SendGrid and MSG91 with live API keys as in-scope runtime services -- needs product owner clarification on whether email/SMS delivery ships in this release.
- Exact commission and payout mechanics for organizers are explicitly undecided.

### Architecture

- Architecture input does not map components or critical paths to specific requirement IDs (US-001..US-014); requirements-to-architecture traceability needs to be confirmed against the requirements phase input directly.
- No approval date or approver name given for the v1 architecture sign-off.
- No explicit requirement ID linked in the architecture input for this critical path.

### Development

- All 7 epics show role=(unassigned) in the plan input -- no owning agent/role recorded at epic level.
- Companion story US-005 (Withdraw consent) has no delivery record yet, so DPDP consent-withdrawal capability cannot be confirmed as built.
- No delivery/ticket record for US-005 (Withdraw consent).
- No delivery/ticket record for US-006 (Create an event listing).
- No delivery/ticket record for US-007 (Define general-admission ticket types).
- No delivery/ticket record for US-008 or its sub-tasks US-008-T1/T2/T3 (organizer dashboard).
- No delivery/ticket record for US-009 or its sub-tasks US-009-T1/T2/T3 (browse/search).
- No delivery/ticket record for US-010 (event detail page).
- No delivery/ticket record for US-011 or its sub-tasks US-011-T1/T2/T3/T4 (booking & payment, incl. overselling protection).
- No delivery/ticket record for US-012 or its sub-tasks US-012-T1/T2 (QR ticket issuance).
- No delivery/ticket record for US-013 (my tickets view).
- No delivery/ticket record for US-014 (responsive web app).
- 'Development run status: completed' conflicts with the absence of delivery data for 10 of 14 stories -- needs confirmation from the development agent or run log before this phase can be considered fully documented.

### Testing

- Testing phase has not started; none of the acceptance criteria (AC-001..AC-036) or non-functional requirements (NFR-001..NFR-013) have recorded test evidence.

### Deployment

- No deployment date/timestamp provided.
- No record of who approved or executed this deployment.
- No release notes or changelog indicating which of US-001 through US-014 are included in version 88c1f0dd60a9, so traceability to requirements cannot be established.
- No mention of pre-deployment test results or sign-off backing this release.
- No rollback plan or prior-version reference recorded in case this deployment needs to be reverted.
- Frontend and backend URLs use .local domains, which is unusual for a 'live' production deployment -- not flagged as an error, but worth human confirmation that this is the intended production environment.

### Maintenance

- No maintenance-phase data exists yet, consistent with the application not having been deployed.
<!-- sdlc:auto:end open-gaps -->
