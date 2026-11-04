# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Attendee and organizer registration, sign-in/out, and DPDP consent capture at signup

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Attendee self-registration | 5 | backend-agent | — |
| US-002 | Story | Organizer self-registration | 5 | backend-agent | — |
| US-003 | Story | Secure sign-in and sign-out | 3 | backend-agent | US-001, US-002 |
| US-004 | Story | Explicit consent capture at signup | 5 | backend-agent | US-001, US-002 |

## Sprint 2: Sprint 2

Event creation, general-admission ticket types, consent withdrawal, and the event detail page

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Withdraw consent | 3 | security-agent | US-003, US-004 |
| US-006 | Story | Create an event listing | 5 | backend-agent | US-002, US-003 |
| US-007 | Story | Define general-admission ticket types | 5 | backend-agent | US-006 |
| US-010 | Story | View event detail page | 5 | frontend-agent | US-006, US-007 |

## Sprint 3: Sprint 3

Organizer dashboard for managing events and sales, plus event browse/search

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-008 | Story | View and manage own events | 8 | backend-agent | US-006, US-007 |
| ↳ US-008-T1 | Task | Implement GET /organizer/events endpoint with sold-vs-available aggregation | — | backend-agent | — |
| ↳ US-008-T2 | Task | Build organizer dashboard UI listing events and sales status | — | frontend-agent | — |
| ↳ US-008-T3 | Task | Implement close-sales / take-offline action for an event | — | backend-agent | — |
| US-009 | Story | Browse and search events by city, date and category | 8 | integration-agent | US-006 |
| ↳ US-009-T1 | Task | Integrate Meilisearch indexing on event create/update | — | integration-agent | — |
| ↳ US-009-T2 | Task | Implement GET /events/search with city, date and category filters | — | backend-agent | — |
| ↳ US-009-T3 | Task | Build frontend browse and filter UI | — | frontend-agent | — |

## Sprint 4: Sprint 4

End-to-end ticket booking and online payment with overselling protection

Capacity: 20 points · Committed: 13

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-011 | Story | Book and pay for tickets | 13 | integration-agent | US-003, US-007, US-010 |
| ↳ US-011-T1 | Task | Implement POST /orders with concurrency-safe stock reservation | — | backend-agent | — |
| ↳ US-011-T2 | Task | Integrate Razorpay checkout flow | — | integration-agent | — |
| ↳ US-011-T3 | Task | Implement POST /payments/webhook to confirm payment and trigger ticket issuance | — | integration-agent | — |
| ↳ US-011-T4 | Task | Release reserved stock on payment failure or cancellation | — | backend-agent | — |

## Sprint 5: Sprint 5

QR ticket issuance, my-tickets view, and responsive web polish across core pages

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Receive unique QR-code digital tickets | 8 | backend-agent | US-011 |
| ↳ US-012-T1 | Task | Implement background QR generation job | — | backend-agent | — |
| ↳ US-012-T2 | Task | Build ticket detail view with QR display | — | frontend-agent | — |
| US-013 | Story | My tickets view | 3 | frontend-agent | US-011, US-012 |
| US-014 | Story | Use the platform as a responsive web app | 5 | frontend-agent | US-009, US-010, US-011, US-013 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
