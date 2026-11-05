# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Attendee self-registration | US-001 | 1 | POST /auth/register, api_backend, db, users, web_app | backend/src/main/java/app/SecurityConfig.java, backend/src/main/java/app/api/ApiController.java, backend/src/main/java/app/auth/AuthService.java, backend/src/main/java/app/auth/ConsentNotice.java, backend/src/main/java/app/auth/EmailInUseException.java +13 more | a97029a | delivered | not run | 3/3 tested · 3/3 passing | — |
| US-002 | EPIC-001 | Organizer self-registration | US-002 | 1 | POST /auth/register, api_backend, db, organizer_profiles, users, web_app | — | a97029a | delivered | not run | 2/2 tested · 2/2 passing | — |
| US-003 | EPIC-001 | Secure sign-in and sign-out | US-003 | 1 | POST /auth/login, POST /auth/logout, api_backend, db, users, web_app | backend/src/main/java/app/api/ApiController.java, backend/src/main/java/app/auth/AuthService.java, backend/src/main/java/app/auth/InvalidCredentialsException.java, backend/src/main/java/app/auth/LoginRequest.java, backend/src/main/java/app/model/AuditLog.java +8 more | 6c03935 | delivered | not run | 3/3 tested · 3/3 passing | — |
| US-004 | EPIC-002 | Explicit consent capture at signup | US-004 | 1 | POST /auth/register, api_backend, consent_records, db, web_app | — | a97029a | delivered | not run | 2/3 tested · 2/3 passing | — |
| US-005 | EPIC-002 | Withdraw consent | US-005 | 2 | POST /consent/withdraw, api_backend, consent_records, db, web_app | backend/src/test/java/app/api/ConsentWithdrawalIT.java, frontend/e2e/consent-withdrawal.e2e.spec.ts, frontend/src/screens/account-settings.component.ts | a77e12e | delivered | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-003 | Create an event listing | US-006 | 2 | POST /events, api_backend, db, events, web_app | backend/src/main/java/app/api/ApiController.java, backend/src/main/java/app/events/EventRequest.java, backend/src/main/java/app/events/EventService.java, backend/src/main/java/app/model/EventRepository.java, backend/src/main/java/app/model/TicketTypeRepository.java +1 more | a77e12e | delivered | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-003 | Define general-admission ticket types | US-007 | 2 | POST /events/{id}/ticket-types, api_backend, db, ticket_types, web_app | backend/src/main/java/app/api/ApiController.java, backend/src/main/java/app/events/EventService.java, backend/src/main/java/app/events/TicketTypeRequest.java, backend/src/test/java/app/api/EventTestHelpers.java, backend/src/test/java/app/api/TicketTypeApiIT.java | 211ffe9 | delivered | not run | 0/3 tested · 0/3 passing | — |
| US-008 | EPIC-004 | View and manage own events | US-008, US-008-T1, US-008-T2, US-008-T3 | 3 | GET /organizer/events, PUT /events/{id}, api_backend, db, events, orders, ticket_types, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-009 | EPIC-005 | Browse and search events by city, date and category | US-009, US-009-T1, US-009-T2, US-009-T3 | 3 | GET /events/search, api_backend, cache, events, search, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-005 | View event detail page | US-010 | 2 | GET /events/{id}, api_backend, db, events, ticket_types, web_app | frontend/e2e/event-detail.e2e.spec.ts, frontend/src/app.component.ts, frontend/src/screens/event-detail.component.spec.ts, frontend/src/screens/event-detail.component.ts, frontend/src/screens/events.component.ts | 6ca7d33 | delivered | not run | 2/2 tested · 0/2 passing | — |
| US-011 | EPIC-006 | Book and pay for tickets | US-011, US-011-T1, US-011-T2, US-011-T3, US-011-T4 | 4 | POST /orders, POST /payments/webhook, api_backend, cache, db, order_items, orders, payments, queue, ticket_types, web_app, worker | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-012 | EPIC-006 | Receive unique QR-code digital tickets | US-012, US-012-T1, US-012-T2 | 5 | GET /me/tickets/{id}, api_backend, db, object_store, queue, tickets, web_app, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-013 | EPIC-006 | My tickets view | US-013 | 5 | GET /me/tickets, api_backend, db, orders, tickets, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-007 | Use the platform as a responsive web app | US-014 | 5 | web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
