# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
73 tests · Passed 64 · Failed 0 · Skipped 0 · Not run 9

Acceptance criteria covered: 12/36 · passing: 10/36
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-001: Attendee self-registration

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | account settings consent withdrawal > [NFR-004] a failed withdrawal shows an error and leaves consent unchanged | Unit | Passed | `frontend/src/screens/account-settings.component.spec.ts` |
| — | account settings consent withdrawal > [NFR-004] withdraws consent via POST /consent/withdraw in no more steps than granting (open, confirm) | Unit | Passed | `frontend/src/screens/account-settings.component.spec.ts` |
| AC-001, AC-004 | auth screen registration > [AC-001][AC-004] registers an attendee via POST /auth/register, stores the token and routes to events | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-002 | auth screen registration > [AC-002] a 409 from the API shows 'email already in use' on the email field and in the notice block | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-003 | auth screen registration > [AC-003] 400 field errors from the API render as field-level messages under the matching input | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-003 | auth screen registration > [AC-003][NFR-001][NFR-012] blocks submission client-side on a bad email and weak password before calling the API | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-005 | auth screen registration > [AC-005] registers an organizer and routes to the organizer dashboard by returned role | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-006 | auth screen registration > [AC-006] routes organizers to the organizer dashboard by returned role | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-006 | auth screen registration > [AC-006] signs in via POST /auth/login, stores the token and routes attendees to events | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-007 | auth screen registration > [AC-007][NFR-002] a 401 shows one generic 'Email or password is incorrect' notice | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-009 | auth screen registration > [AC-009] never pre-ticks consent and keeps it separate from terms | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| AC-010 | auth screen registration > [AC-010] blocks submission client-side when consent is not given and highlights the consent control | Unit | Passed | `frontend/src/screens/auth.component.spec.ts` |
| — | testAc001RegistersAttendeeAndReturnsSessionToken | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testAc002DuplicateEmailReturns409AndNoSecondAccount | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testAc003InvalidEmailAndWeakPasswordReturn400WithFieldMessages | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| AC-005 | testAc004Ac005RegistersOrganizerWithProfileAndNoApprovalGate | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testAc009ConsentNoticeMetadataIsServed | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testAc010MissingConsentReturns400AndNoUserRow | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testAc010RegisterWithoutExtraHeaderStillSucceeds | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testAc011WritesConsentRecordWithPurposesAndNoticeVersion | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testWithdrawRequiresNoMoreStepsThanGrantingAndSetsWithdrawnAt | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |
| — | testWithdrawWithoutTokenIsRejected | Integration | Passed | `backend/src/test/java/app/api/ApiControllerIT.java` |

### US-003: Secure sign-in and sign-out

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-008 | App > [AC-008] allows a protected screen when a session token is stored | Unit | Passed | `frontend/src/app.component.spec.ts` |
| AC-008 | App > [AC-008] redirects to the auth screen when navigating to a protected screen without a stored token | Unit | Passed | `frontend/src/app.component.spec.ts` |
| AC-008 | App > [AC-008] signing out calls POST /auth/logout, clears the token and returns to the auth screen | Unit | Passed | `frontend/src/app.component.spec.ts` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/app.component.spec.ts` |

## Sprint 2

### US-005: Withdraw consent

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | testAc001ValidTokenWithdrawsOnlyThatUsersConsentAndReturnsWithdrawnAt | Integration | Passed | `backend/src/test/java/app/api/ConsentWithdrawalIT.java` |
| — | testAc002InvalidTokenReturns401AndRecordsNothing | Integration | Passed | `backend/src/test/java/app/api/ConsentWithdrawalIT.java` |
| — | testAc002NoTokenReturns401AndRecordsNothing | Integration | Passed | `backend/src/test/java/app/api/ConsentWithdrawalIT.java` |
| — | testAc003WithdrawalWritesAuditLogRowWithActorAndTimestampNfr006 | Integration | Passed | `backend/src/test/java/app/api/ConsentWithdrawalIT.java` |
| — | [AC-api-failure] an API failure on withdrawal leaves consent Active and shows the inline error | E2E | Not run yet | `frontend/e2e/consent-withdrawal.e2e.spec.ts` |
| — | [AC-cancel] cancelling the dialog leaves consent Active and makes no withdrawal | E2E | Not run yet | `frontend/e2e/consent-withdrawal.e2e.spec.ts` |
| — | [AC-withdraw] a signed-in user withdraws consent: badge turns Withdrawn, the button disables, and the confirmation shows the recorded date and time | E2E | Not run yet | `frontend/e2e/consent-withdrawal.e2e.spec.ts` |

### US-006: Create an event listing

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | testAc014OrganizerCreatesEventVisibleToUnauthenticatedAttendee | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testAc015InvalidStartsAtReturns400WithFieldError | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testAc015MissingCategoryReturns400WithFieldErrorAndNoRowPersisted | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testAc015MissingCityReturns400WithFieldErrorAndNoRowPersisted | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testAc015MissingDescriptionReturns400WithFieldErrorAndNoRowPersisted | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testAc015MissingStartsAtReturns400WithFieldErrorAndNoRowPersisted | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testAc015MissingTitleReturns400WithFieldErrorAndNoRowPersisted | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testAc015MissingVenueReturns400WithFieldErrorAndNoRowPersisted | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testEventMutationWritesAuditLogRowWithTimestamp | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testOrganizerEventsReturnsOnlyCallersEventsAndEmptyForNewOrganizer | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testPutByNonOwnerReturns403AndLeavesEventUnchangedThenOwnerUpdateIsVisible | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testUnauthenticatedGetOrganizerEventsReturns401 | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testUnauthenticatedPostEventsReturns401 | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |
| — | testUnauthenticatedPutEventsByIdReturns401 | Integration | Passed | `backend/src/test/java/app/api/EventApiIT.java` |

### US-007: Define general-admission ticket types

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | testAc016OwnerAddsTicketTypeAndItAppearsForSaleOnTheEvent | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testAc017TwoTicketTypesHoldIndependentQuantities | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testAc018RequestAndResponseHaveNoSeatFields | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testBlankNameReturns400WithFieldErrorAndPersistsNothing | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testGetEventByIdForUnknownIdReturns404 | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testGetEventByIdReturnsVenueCityDateDescriptionAndSoldOutFlags | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testNegativePriceReturns400WithFieldErrorAndPersistsNothing | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testNegativeQuantityReturns400WithFieldErrorAndPersistsNothing | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testNonOwnerAddingTicketTypeReceives403AndPersistsNothing | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testZeroPriceReturns400WithFieldErrorAndPersistsNothing | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |
| — | testZeroQuantityReturns400WithFieldErrorAndPersistsNothing | Integration | Passed | `backend/src/test/java/app/api/TicketTypeApiIT.java` |

### US-010: View event detail page

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-025 | event detail screen > [AC-025] loads GET /events/{id} for the routed event id and renders venue, city, date/time, category, description and ticket types with INR prices | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| AC-026 | event detail screen > [AC-026] a sold-out ticket type renders as sold out with no quantity control and cannot be added to the order summary | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| — | event detail screen > computes the order summary and total from the fetched ticket types | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| — | event detail screen > shows a clear error state with a retry control when the request fails, and retry re-fetches | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| — | event detail screen > shows a loading state while the request is in flight | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| — | event detail screen > shows the empty-state component rather than an empty table when the event has no ticket types | Unit | Passed | `frontend/src/screens/event-detail.component.spec.ts` |
| AC-025 | [AC-025] opening a seeded event's detail page shows its venue, date/time, description and each ticket type with its INR price | E2E | Not run yet | `frontend/e2e/event-detail.e2e.spec.ts` |
| AC-026 | [AC-026] a ticket type with zero remaining quantity is labelled sold out, exposes no quantity control, and cannot be added to the order summary | E2E | Not run yet | `frontend/e2e/event-detail.e2e.spec.ts` |
| — | [NFR-012] an event with no ticket types shows the empty state | E2E | Not run yet | `frontend/e2e/event-detail.e2e.spec.ts` |
| — | [NFR-012] an unknown event id shows the error state | E2E | Not run yet | `frontend/e2e/event-detail.e2e.spec.ts` |
| — | a ticket type with stock can be selected and the order total reflects price x quantity | E2E | Not run yet | `frontend/e2e/event-detail.e2e.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | dropsTheDriverPartThePlatformWrites | Unit | Passed | `backend/src/test/java/app/DatabaseUrlEnvironmentPostProcessorTest.java` |
| — | runsInMemoryWithNoDatabaseSet | Unit | Passed | `backend/src/test/java/app/DatabaseUrlEnvironmentPostProcessorTest.java` |
| — | reportsOk | Unit | Passed | `backend/src/test/java/app/HealthControllerTest.java` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
