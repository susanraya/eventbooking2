# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · draft · source: requirements:scope

Defines the Lightweight MVP scope for eventbooking2: a responsive web app (no native app) for attendee/organizer registration, general-admission event creation, browse/search, booking with digital QR tickets, an organizer dashboard, and DPDP consent capture.

Requirements version 1. In scope: attendee and organizer registration/sign-in; organizer event creation and listing; general-admission ticket type setup (price and quantity); browse/search by city, date, category; event detail pages; ticket booking; digital QR-code tickets viewable in-account; 'my tickets' view; organizer event management dashboard; DPDP consent capture at signup; responsive web delivery only. Explicitly out of scope: reserved seating / interactive seat maps. Delivery scope is labeled 'lightweight'.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007

### REQ-STACK · approved · source: requirements:tech-stack

Product owner approved an exact technology stack: Spring Boot 4.1 (backend), Angular 22 (frontend), PostgreSQL 16 (database), AWS Mumbai region (cloud).

Backend: Spring Boot 4.1. Frontend: Angular 22. Database: PostgreSQL 16 -- chosen for strong transactional guarantees to prevent overselling fixed ticket quantities and to prevent a QR code being marked used more than once, and to hold commission/payout/refund records accurately; runs in AWS Mumbai for data residency. Cloud: AWS -- Mumbai region chosen to keep personal and payment data, database storage and backups inside India per DPDP/RBI posture, to retain CERT-In's expected 180-day ICT logs, and because it integrates well with Razorpay. These choices are stated as fixed: 'design against exactly these; do not substitute.'

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-005, EPIC-006

- ⚠ No architecture phase exists yet to confirm this stack has actually been translated into a system design (services, data model, deployment topology).

### REQ-SERVICES · approved · source: requirements:services

Product owner approved an exact set of third-party/runtime services and their required environment variables: Razorpay, SendGrid, MSG91, Meilisearch, Redis (cache), Redis (queue), and Amazon S3.

Payments: Razorpay (custom integration; env RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET) -- supports UPI/Indian cards, commission and organizer payouts, keeps settlement data in India. Email: SendGrid (SaaS; env SENDGRID_API_KEY) -- delivers transactional booking confirmations, QR tickets, updates and reminders. SMS: MSG91 (custom; env MSG91_AUTH_KEY, MSG91_SENDER_ID) -- India-based, DLT-registered, for optional SMS alongside email. Search: Meilisearch (container getmeili/meilisearch:v1.10.3) -- fast, typo-tolerant browse/filter by city, date, category. Cache: Redis (container redis:7-alpine) -- hot listing data and ticket-quantity coordination to prevent overselling during rushes. Queue: Redis as a queue (container redis:7-alpine) -- background QR issuance, confirmation email/SMS, and reminders so buyers get an instant 'paid' response. File storage: Amazon S3 (SaaS; env AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET) -- durable storage for posters and QR-ticket images in Mumbai region. Full required API key/env list: AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, MSG91_AUTH_KEY, MSG91_SENDER_ID, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, REDIS_URL, S3_BUCKET, SENDGRID_API_KEY.

**Related:** EPIC-006, US-011, US-012, EPIC-005, US-009

- ⚠ Discrepancy: this services list approves SendGrid (email) and MSG91 (SMS) as in-scope runtime services with required API keys, but EPIC-006's stated assumption says 'email delivery of tickets and optional SMS notifications via an Indian provider are deferred beyond this MVP, in which tickets are viewable in-account.' It is unresolved whether email/SMS delivery of tickets is actually in scope for this MVP or deferred -- needs product owner clarification.

### REQ-NFR · draft · source: requirements:NFR-001..NFR-013

Thirteen non-functional requirements cover security, DPDP/data-residency compliance, privacy isolation, anti-overselling scalability, async performance, search performance, cross-device compatibility, and validation usability.

NFR-001 (security): password strength rules enforced on registration, with blocking/explanation -- applies to US-001, US-002. NFR-002 (security): generic sign-in failure message, doesn't reveal which field was wrong -- applies to US-003. NFR-003 (security): sign-out ends session; protected pages require re-auth -- applies to US-003. NFR-004 (compliance) -- DPDP Act: notice and consent, data-principal rights: unbundled, not-pre-ticked consent control that cannot be skipped; consent record stores purposes/timestamp/notice version; withdrawal must be no harder than granting -- applies to US-004, US-005. NFR-005 (compliance) -- DPDP Act & RBI data localisation: all personal and payment data, including DB storage and backups, stored in India (AWS Mumbai) -- applies to whole system. NFR-006 (compliance) -- DPDP Act & CERT-In: breach notification obligations and ICT log retention; target is 180-day log retention -- applies to whole system. NFR-007 (privacy): attendees see only their own orders/tickets; organizers manage only their own events -- applies to US-008, US-012, US-013. NFR-008 (scalability): no overselling of fixed ticket quantity under concurrent demand -- applies to US-011. NFR-009 (performance): instant payment confirmation with background ticket/notification processing -- applies to US-011, US-012. NFR-010 (performance): fast, typo-tolerant search at scale -- applies to US-009. NFR-011 (compatibility): core pages usable on mobile and desktop browsers, no native app -- applies to US-014. NFR-012 (usability): clear empty states and field-level validation messages -- applies to US-001, US-006, US-009, US-013. NFR-013 (compliance, accepted risk) -- DPDP Act verifiable parental consent: deliberately not built, based on an 'attendees are 18+' assumption -- applies to US-004.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-008, US-009, US-011, US-012, US-013, US-014

- ⚠ NFR-006 commits to 180-day ICT log retention and 'following DPDP/CERT-In notification obligations' generically, but does not specify a concrete breach-notification process/runbook or the CERT-In 6-hour incident reporting timeline.
- ⚠ NFR-013 accepts the risk of no parental-consent flow based on an unverified 'users are 18+' assumption; no age-verification mechanism is specified anywhere in requirements.

### EPIC-001 · draft · source: requirements:EPIC-001

Attendees and organizers can self-register and sign in to the responsive web app, with two self-service roles: attendee (browse/buy) and organizer (create/manage events).

US-001 (critical): attendee self-registration with email/password/basic details; unique email required; password must meet strength rules; AC-001 success case, AC-002 duplicate email rejected, AC-003 invalid email/password blocked with explanation. US-002 (critical): organizer self-registration with organization details, consent, and immediate event-creation ability with no admin pre-approval gate (AC-004, AC-005). US-003 (critical): secure sign-in/out -- correct credentials route to role-appropriate home (AC-006); incorrect credentials get a generic error (AC-007); sign-out ends session and protected pages require re-auth (AC-008). Assumptions stated: attendees are assumed 18+ so no child-targeted features are built; organizer moderation/suspension (platform-admin role) is part of the broader product vision but out of scope for this MVP.

**Related:** US-001, US-002, US-003, NFR-001, NFR-002, NFR-003

- ⚠ No platform-admin moderation/suspension capability exists at this scope -- organizers can list events with zero approval gate, which is an accepted assumption but not validated against any policy requirement.

### EPIC-002 · draft · source: requirements:EPIC-002

DPDP Act: notice and consent -- the platform captures explicit, informed DPDP consent at signup and lets users withdraw it as easily as it was given.

US-004 (critical): consent capture at signup -- clear, specific, unbundled, not-pre-ticked consent notice (AC-009); registration blocked without active consent (AC-010); consent record (purposes, timestamp, notice version) stored (AC-011). US-005 (high) -- DPDP Act: data-principal rights (withdrawal): signed-in users withdraw consent from account settings through a flow no harder than granting it (AC-012); withdrawal acknowledged and timestamped (AC-013), with downstream data-handling response to withdrawal described only as following 'DPDP posture,' defined operationally rather than as a concrete requirement. Assumptions: data including payment data is stored in India per DPDP/RBI posture and breach handling follows DPDP/CERT-In obligations, but these are infrastructure/operational postures rather than user-facing features in this MVP; attendees are assumed adults so no parental-consent flow is built (NFR-013).

**Related:** US-004, US-005, NFR-004, NFR-005, NFR-006, NFR-013

- ⚠ DPDP Act: no Consent Manager mechanism (a registered, interoperable consent manager) is referenced anywhere in requirements.
- ⚠ AC-013's 'downstream data-handling response to withdrawal' is explicitly left as an undefined operational assumption rather than a specified requirement.
- ⚠ Significant Data Fiduciary duties (India-based DPO, audits, Data Protection Impact Assessments) are not addressed, and applicability has not been assessed for eventbooking2's expected scale.

### EPIC-003 · draft · source: requirements:EPIC-003

Organizers create event listings and define general-admission ticket types with price and quantity; reserved seating is explicitly out of scope.

US-006 (critical): create event with title, venue, city, date/time, category, description -- valid submissions become visible in discovery (AC-014), invalid/missing fields block save with field-level errors (AC-015). US-007 (high): define one or more general-admission ticket types, each with name, INR price, and quantity, sold independently against its own stock (AC-016, AC-017); no seat map or seat-assignment option is ever presented (AC-018). Assumption: general admission only, reserved seating/interactive seat maps explicitly out of scope at launch.

**Related:** US-006, US-007, NFR-012

### EPIC-004 · draft · source: requirements:EPIC-004

Organizers manage their events from a dashboard showing status and sales; refunds/payouts are not automated at this scope.

US-008 (medium): dashboard lists organizer's own events with date, publication status, and tickets sold vs. quantity available (AC-019); edits to event/ticket details persist and reflect on the public listing (AC-020); organizer can take an event offline/close sales to stop bookings (AC-021). Assumption: organizer payouts, platform commission handling, per-event refund/cancellation policies, and admin moderation are part of the broader product vision but beyond this Lightweight MVP; automated attendee refunds on cancellation are explicitly not included.

**Related:** US-008, NFR-007, NFR-012

- ⚠ No automated refund or payout process exists even though payments and commissions are collected -- operational/manual handling is implied but not specified.

### EPIC-005 · draft · source: requirements:EPIC-005

Attendees discover events through browse/search filtered by city, date, and category, and view event detail pages with venue, date/time, description, and ticket options.

US-009 (high): filter by city alone (AC-022) or combined city+date+category (AC-023); clear empty-state message when no matches (AC-024). US-010 (high): event detail page shows venue, date/time, description, and ticket types with prices (AC-025); a fully sold ticket type shows as sold out and cannot be selected (AC-026).

**Related:** US-009, US-010, NFR-010, NFR-012

### EPIC-006 · draft · source: requirements:EPIC-006

Attendees book and pay for general-admission tickets online and receive unique QR-code tickets viewable in their account via a 'My Tickets' view; on-event check-in scanning is out of scope.

US-011 (critical): select ticket type(s)/quantity within stock creates an order routed to online payment (AC-027); successful payment confirms booking, decrements stock, and issues tickets (AC-028); over-requesting blocked with remaining availability shown (AC-029); failed/cancelled payment issues no tickets and releases reserved stock (AC-030). US-012 (high): each confirmed ticket gets a unique QR code with event details (AC-031); multi-ticket orders get distinct codes per ticket (AC-032). US-013 (medium): 'My Tickets' lists tickets with event info, distinguishing upcoming/past (AC-033); clear empty state when no bookings (AC-034). Assumptions: online payment via an Indian gateway (Razorpay assumed, UPI/cards) with payment data stored in India per RBI localisation; platform commission/organizer payouts are assumed posture, exact specifics undecided; email delivery of tickets and optional SMS notifications via an Indian provider are stated as deferred beyond this MVP (tickets viewable in-account instead); the on-event QR check-in/scanning tool is beyond this MVP.

**Related:** US-011, US-012, US-013, NFR-005, NFR-007, NFR-008, NFR-009, REQ-SERVICES

- ⚠ Conflict: this epic's assumption states email/SMS ticket delivery is deferred beyond the MVP, but REQ-SERVICES approves and requires SendGrid and MSG91 with live API keys as in-scope runtime services -- needs product owner clarification on whether email/SMS delivery ships in this release.
- ⚠ Exact commission and payout mechanics for organizers are explicitly undecided.

### EPIC-007 · draft · source: requirements:EPIC-007

The platform is delivered as a responsive web application usable on desktop and mobile browsers, with no native iOS/Android app.

US-014 (high): on mobile browsers, core pages (register, search, event detail, booking, my tickets) adapt layout and remain usable (AC-035); on desktop browsers, pages render appropriately for larger screens (AC-036). Assumption: no native app at launch; responsive web only.

**Related:** US-014, NFR-011
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-04

**Capabilities in scope:** Attendee and organizer account registration and sign-in, Organizer event creation and listing, General-admission ticket type setup (price and quantity), Event browse and search by city, date and category, Event detail pages (venue, date/time, description, ticket options), Ticket booking, Digital QR-code ticket viewable in the attendee account, Attendee "my tickets" view, Organizer event management dashboard, DPDP consent capture at signup, Delivered as a responsive web app, no native mobile app

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | Spring Boot | — |
| cloud | AWS | Your DPDP and RBI posture requires personal and payment data to stay in India; AWS's Mumbai region lets you keep all storage, database and backups inside the country. It also keeps the 180-day ICT logs CERT-In expects and integrates with Razorpay, which runs comfortably on AWS in India. |
| database | PostgreSQL | Ticket sales must never oversell a fixed quantity and a QR code must be marked used exactly once at the gate. PostgreSQL's strong transactional guarantees are what stop two buyers taking the last ticket or a QR being scanned twice. It also holds your commission, payout and refund records with the accuracy money handling demands, and runs in AWS's Mumbai region to meet your India data-residency posture. |
| frontend | Angular | — |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Account Registration & Authentication

Attendees and organizers can self-register and sign in to the responsive web app. Two self-service roles are supported at this scope: attendee (browse/buy) and organizer (create/manage events). Assumption: attendees are assumed to be adults (18+); no features target children, so DPDP verifiable parental-consent flows are deliberately not built. Assumption: organizers self-register and can list events immediately; a platform-admin moderation/suspension role is part of the overall product vision but is beyond this Lightweight MVP and is not implemented here.

### US-001: Attendee self-registration

**Priority:** critical

> As a visitor who wants to buy tickets, I want to create an attendee account with my email, password and basic details, so that I can book and manage tickets.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | a new visitor on the attendee registration page | they submit a valid email, a password meeting the strength rules and the required details, and accept the terms | an attendee account is created and they are signed in |
| AC-002 | a visitor entering an email that is already registered | they submit the registration form | registration is rejected with a clear message that the email is already in use |
| AC-003 | a visitor entering an invalid email or a password that does not meet the strength rules | they submit the form | the system blocks registration and explains which requirement was not met |

### US-002: Organizer self-registration

**Priority:** critical

> As a visitor who wants to sell tickets, I want to self-register an organizer account with my organization details, so that I can list and manage my own events.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | a new visitor choosing to register as an organizer | they provide the required organization details, accept the terms and give consent | an organizer account is created and they can immediately begin creating events |
| AC-005 | a newly registered organizer (assumption: no admin pre-approval gate at this MVP scope) | they open their dashboard for the first time | they are able to create events without waiting for manual approval |

### US-003: Secure sign-in and sign-out

**Priority:** critical

> As a registered user, I want to sign in and out securely, so that my account and tickets are protected.

| ID | Given | When | Then |
|---|---|---|---|
| AC-006 | a registered user with correct credentials | they sign in | they are authenticated and taken to the home appropriate to their role (attendee or organizer) |
| AC-007 | a user entering incorrect credentials | they attempt to sign in | access is denied with a generic error that does not reveal which field was wrong |
| AC-008 | a signed-in user | they sign out | their session is ended and protected pages require signing in again |

## EPIC-002: DPDP Consent & Data Protection

The platform captures explicit DPDP consent at signup and lets users withdraw it. Assumption: data, including payment data, is stored in India to reflect DPDP and RBI data-localisation posture, and breach handling follows DPDP/CERT-In notification obligations; these are infrastructure/operational postures surfaced here rather than user-facing features in this MVP. Assumption: attendees are adults (18+), so no parental-consent flow is provided.

### US-004: Explicit consent capture at signup

**Priority:** critical

> As a user registering on the platform, I want to give explicit, informed consent for processing of my personal data, so that my data is handled lawfully under the DPDP Act.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | a visitor on the registration form | the form loads | a clear, specific consent notice describing the processing purposes is shown with an unbundled, not pre-ticked consent control |
| AC-010 | a visitor who has not actively given consent | they attempt to complete registration | registration cannot proceed and the consent requirement is highlighted |
| AC-011 | a visitor who actively grants consent | they complete registration | the consent record (purposes, timestamp and notice version) is stored |

### US-005: Withdraw consent

**Priority:** high

> As a registered user, I want to withdraw my consent as easily as I gave it, so that I retain control over my personal data as required by DPDP.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | a signed-in user in their account settings | they choose to withdraw consent | the withdrawal is recorded and confirmed through a flow no harder than granting consent was |
| AC-013 | a user who has withdrawn consent (assumption: downstream data-handling/retention response to withdrawal follows DPDP posture and is defined operationally) | the withdrawal is submitted | the system acknowledges the request and records its date and time |

## EPIC-003: Organizer Event Creation & Ticket Setup

Organizers create event listings and define general-admission ticket types with price and quantity. Assumption: general admission only; reserved seating and interactive seat maps are explicitly out of scope at launch.

### US-006: Create an event listing

**Priority:** critical

> As a organizer, I want to create an event with venue, date/time, category and description, so that attendees can discover and book it.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | a signed-in organizer | they submit an event with all required fields (title, venue, city, date/time, category and description) | the event is created and becomes visible to attendees in discovery |
| AC-015 | an organizer submitting an event with missing or invalid required fields | they try to save | creation is blocked and field-level errors identify what must be fixed |

### US-007: Define general-admission ticket types

**Priority:** high

> As a organizer, I want to define one or more general-admission ticket types each with a name, price and quantity, so that attendees can buy different admission options.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | an organizer editing their event | they add a ticket type with a name, a price in INR and an available quantity | that ticket type becomes available for sale on the event |
| AC-017 | an organizer adding multiple ticket types such as Regular and VIP | the event is published | each ticket type is sold independently against its own quantity |
| AC-018 | an organizer defining tickets (general admission only; no seat selection) | they configure a ticket type | no seat map or seat-assignment option is presented |

## EPIC-004: Organizer Event Management Dashboard

Organizers manage their events from a dashboard showing status and sales. Assumption: organizer payouts, platform commission handling, per-event refund/cancellation policies and admin moderation are part of the broader product vision but are beyond this Lightweight MVP; at this scope organizers can edit listings and stop sales but automated refund/payout processing is not included.

### US-008: View and manage own events

**Priority:** medium

> As a organizer, I want a dashboard listing my events with their status and sales, so that I can keep my listings accurate and track demand.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | a signed-in organizer | they open their dashboard | they see their events with key details including date, publication status and tickets sold versus quantity available |
| AC-020 | an organizer editing an existing event's details or ticket types | they save the changes | the updates are persisted and reflected on the public listing |
| AC-021 | an organizer who wants to stop selling an event (assumption: automated attendee refunds on cancellation are beyond this MVP) | they take the event offline or close its sales | the event is no longer bookable by attendees |

## EPIC-005: Event Discovery & Search

Attendees discover events through browse and search filtered by city, date and category, and view event detail pages. Covers discovery and event detail capabilities for the Lightweight MVP.

### US-009: Browse and search events by city, date and category

**Priority:** high

> As a attendee, I want to browse and search events filtered by city, date and category, so that I can quickly find events relevant to me.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | an attendee on the events listing page | they apply a city filter | only events in the selected city are shown |
| AC-023 | an attendee applying city, date and category filters together | the results refresh | only events matching all selected filters are shown |
| AC-024 | filters or a search that match no events | the results are returned | a clear empty-state message is displayed |

### US-010: View event detail page

**Priority:** high

> As a attendee, I want an event detail page showing venue, date/time, description and ticket options, so that I have the information I need to decide whether to book.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | an attendee selecting an event from discovery | the detail page loads | it shows the venue, date/time, description and the available ticket types with their prices |
| AC-026 | a ticket type whose quantity is fully sold | the detail page is displayed | that ticket type is shown as sold out and cannot be selected |

## EPIC-006: Ticket Booking & Digital Tickets

Attendees book and pay for general-admission tickets and receive unique QR-code tickets viewable in their account, with a 'my tickets' view. Assumption: payment is online via an Indian gateway (Razorpay assumed, supporting UPI/cards) with payment data stored in India per RBI localisation; platform commission and organizer payouts are assumed posture and exact payment specifics were not decided. Assumption: email delivery of tickets and optional SMS notifications via an Indian provider are deferred beyond this MVP, in which tickets are viewable in-account. Assumption: the on-event QR check-in/scanning tool is part of the product vision but is beyond this Lightweight MVP.

### US-011: Book and pay for tickets

**Priority:** critical

> As a attendee, I want to select ticket types and quantities and pay online, so that I can secure my entry to an event.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | an attendee on an event with available tickets | they select ticket type(s) and a quantity within the available stock | an order is created and they are taken to online payment |
| AC-028 | an order awaiting payment | payment succeeds via the online gateway (assumption: Razorpay/UPI/cards) | the booking is confirmed, stock is decremented and tickets are issued |
| AC-029 | an attendee requesting more tickets than remain available | they attempt to book | the system prevents the booking and shows the remaining availability |
| AC-030 | an order where payment fails or is cancelled | the attendee returns to the platform | no tickets are issued and the reserved stock is released |

### US-012: Receive unique QR-code digital tickets

**Priority:** high

> As a attendee, I want each ticket issued as a unique QR code viewable in my account, so that I can present it for entry.

| ID | Given | When | Then |
|---|---|---|---|
| AC-031 | a confirmed booking | the attendee opens a ticket in their account | the ticket displays a unique QR code together with the event details |
| AC-032 | an order containing more than one ticket | the tickets are generated | each ticket carries a distinct, unique QR code/identifier |

### US-013: My tickets view

**Priority:** medium

> As a attendee, I want a 'my tickets' view listing all my tickets, so that I can find and manage my upcoming and past tickets.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | a signed-in attendee with confirmed bookings | they open 'My Tickets' | they see their tickets with event information, distinguishing upcoming from past events |
| AC-034 | a signed-in attendee with no bookings | they open 'My Tickets' | a clear empty state is shown |

## EPIC-007: Responsive Web Delivery

The platform is delivered as a responsive web application usable on desktop and mobile browsers. Assumption: no native iOS/Android app at launch; responsive web only.

### US-014: Use the platform as a responsive web app

**Priority:** high

> As a user on any device, I want the platform to adapt to desktop and mobile browser screens, so that I can complete core tasks without a native app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-035 | a user on a mobile browser | they access core pages (register, search, event detail, booking, my tickets) | the layout adapts to the screen and those core actions are usable |
| AC-036 | a user on a desktop browser | they access the app | the pages render appropriately for the larger screen |
<!-- sdlc:auto:end epics -->
