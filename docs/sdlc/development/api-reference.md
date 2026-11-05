# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| POST | /auth/login | postAuthLogin | `backend/src/main/java/app/api/ApiController.java:84` | Authenticate credentials and return a JWT; failures give a generic error |
| POST | /auth/logout | postAuthLogout | `backend/src/main/java/app/api/ApiController.java:112` | End the current session so protected pages require re-auth |
| POST | /auth/register | postAuthRegister | `backend/src/main/java/app/api/ApiController.java:45` | Register an attendee or organizer with validated email/password, required details and active |
| GET | /consent/notice | getConsentNotice | `backend/src/main/java/app/api/ApiController.java:77` | AC-009: the purposes and notice version the registration form must render. |
| POST | /consent/withdraw | postConsentWithdraw | `backend/src/main/java/app/api/ApiController.java:121` | Record a consent withdrawal with timestamp through a flow no harder than granting |
| POST | /events | postEvents | `backend/src/main/java/app/api/ApiController.java:131` | Organizer creates an event with validated required fields |
| GET | /events/{id} | getEventsById | `backend/src/main/java/app/api/ApiController.java:158` | Public event detail with venue, date/time, description and ticket types marked sold-out where |
| PUT | /events/{id} | putEventsById | `backend/src/main/java/app/api/ApiController.java:137` | Organizer updates their own event; changes reflect on the public listing |
| POST | /events/{id}/ticket-types | postEventsByIdTicketTypes | `backend/src/main/java/app/api/ApiController.java:143` | Organizer defines a general-admission ticket type with name, INR price and quantity |
| GET | /health | health | `backend/src/main/java/app/HealthController.java:11` | — |
| GET | /me/tickets | getMeTickets | `backend/src/main/java/app/api/ApiController.java:173` | Attendee's own tickets with event info, upcoming vs past, each with its QR image |
| GET | /me/tickets/{id} | getMeTicketsById | `backend/src/main/java/app/api/ApiController.java:179` | View a single owned ticket with its unique QR code and event details |
| POST | /orders | postOrders | `backend/src/main/java/app/api/ApiController.java:167` | Create an order for selected ticket types/quantities within stock, reserve stock and create a |
| GET | /organizer/events | getOrganizerEvents | `backend/src/main/java/app/api/ApiController.java:149` | Organizer dashboard list of own events with status and tickets sold vs available |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- GET /events/search
- POST /payments/webhook

**Code only:**

- GET /consent/notice
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `4a1a709`
<!-- sdlc:auto:end source -->
