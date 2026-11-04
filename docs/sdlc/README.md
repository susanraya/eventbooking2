# eventbooking2 — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
basic event booking qpp

**Documentation version:** v1
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 1 entry |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | not generated yet |
| [API (OpenAPI)](architecture/api/openapi.yaml) | not generated yet |
| [Decisions (ADRs)](architecture/adr/README.md) | 0 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 14 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
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

- Architecture phase has not started; the approved tech stack (Spring Boot 4.1, Angular 22, PostgreSQL 16, AWS Mumbai) and approved services (Razorpay, SendGrid, MSG91, Meilisearch, Redis, S3) from requirements have not been translated into a system design.
- No App Design screens exist yet, which also blocks the user_guide section.

### Development

- Development has not begun; none of the 14 user stories (US-001..US-014) or 36 acceptance criteria have recorded implementation status.

### Testing

- Testing phase has not started; none of the acceptance criteria (AC-001..AC-036) or non-functional requirements (NFR-001..NFR-013) have recorded test evidence.

### Deployment

- No deployment recorded yet for eventbooking2.

### Maintenance

- No maintenance-phase data exists yet, consistent with the application not having been deployed.
<!-- sdlc:auto:end open-gaps -->
