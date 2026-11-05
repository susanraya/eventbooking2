# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| POST | /auth/login | postAuthLogin | `backend/src/main/java/app/api/ApiController.java:94` | Authenticate credentials and return a JWT; failures give a generic error |
| POST | /auth/logout | postAuthLogout | `backend/src/main/java/app/api/ApiController.java:122` | End the current session so protected pages require re-auth |
| POST | /auth/register | postAuthRegister | `backend/src/main/java/app/api/ApiController.java:55` | Register an attendee or organizer with validated email/password, required details and active |
| GET | /consent/notice | getConsentNotice | `backend/src/main/java/app/api/ApiController.java:87` | AC-009: the purposes and notice version the registration form must render. |
| POST | /consent/withdraw | postConsentWithdraw | `backend/src/main/java/app/api/ApiController.java:131` | Record a consent withdrawal with timestamp through a flow no harder than granting |
| POST | /events | postEvents | `backend/src/main/java/app/api/ApiController.java:141` | Organizer creates an event with validated required fields (AC-014, AC-015). |
| GET | /events/{id} | getEventsById | `backend/src/main/java/app/api/ApiController.java:189` | Public event detail with venue, date/time, description and ticket types marked sold-out where |
| PUT | /events/{id} | putEventsById | `backend/src/main/java/app/api/ApiController.java:152` | Organizer updates their own event; a non-owner gets 403 (NFR-007). |
| POST | /events/{id}/ticket-types | postEventsByIdTicketTypes | `backend/src/main/java/app/api/ApiController.java:164` | Organizer defines a general-admission ticket type with name, INR price and quantity |
| GET | /health | health | `backend/src/main/java/app/HealthController.java:11` | — |
| GET | /me/tickets | getMeTickets | `backend/src/main/java/app/api/ApiController.java:236` | Attendee's own tickets with event info, upcoming vs past, each with its QR image |
| GET | /me/tickets/{id} | getMeTicketsById | `backend/src/main/java/app/api/ApiController.java:242` | View a single owned ticket with its unique QR code and event details |
| POST | /orders | postOrders | `backend/src/main/java/app/api/ApiController.java:230` | Create an order for selected ticket types/quantities within stock, reserve stock and create a |
| GET | /organizer/events | getOrganizerEvents | `backend/src/main/java/app/api/ApiController.java:178` | Organizer dashboard list of own events with status, empty when they have none. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- GET /events/search
- POST /payments/webhook

**Code only:**

- GET /consent/notice
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `f8f48be`
<!-- sdlc:auto:end source -->
