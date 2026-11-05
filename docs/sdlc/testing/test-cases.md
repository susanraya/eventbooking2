# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
30 tests · Passed 29 · Failed 0 · Skipped 0 · Not run 1

Acceptance criteria covered: 10/36 · passing: 10/36
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

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | dropsTheDriverPartThePlatformWrites | Unit | Passed | `backend/src/test/java/app/DatabaseUrlEnvironmentPostProcessorTest.java` |
| — | runsInMemoryWithNoDatabaseSet | Unit | Passed | `backend/src/test/java/app/DatabaseUrlEnvironmentPostProcessorTest.java` |
| — | reportsOk | Unit | Passed | `backend/src/test/java/app/HealthControllerTest.java` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
