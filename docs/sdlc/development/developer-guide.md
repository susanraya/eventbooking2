# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `4a1a709` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
eventbooking2 is a Quorq-generated two-app repository for a basic event booking product. The frontend is an Angular 22 app (built with Vite via the Analog plugin) containing every approved screen, currently running on seeded sample data rather than live API calls. The backend is a Spring Boot 4.1 (Java 21, Maven) service that currently implements only health checks, registration/login/logout and consent-withdrawal (via AuthService, JWT, and optional Redis-backed token revocation); every other declared API route (events, orders, tickets, organizer dashboard) is a placeholder stub. Postgres (or an in-memory H2 fallback), Meilisearch and Redis are the supporting services the architecture expects, wired up locally via docker-compose.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm, Vite, Angular 22 tooling)
- Java 21 JDK (backend uses Maven wrapper, no local Maven install required)
- Docker and Docker Compose (for Postgres, Meilisearch, Redis via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. (optional, from repo root) docker compose up -d  # starts Postgres, Meilisearch, and two Redis instances
4. cd backend && sh mvnw spring-boot:run  # with no DATABASE_URL set it falls back to an in-memory H2 database
5. In a separate terminal: cd frontend && npm run dev
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite/Analog dev server for the Angular frontend (run from frontend/) |
| frontend build | `npm run build` | Ahead-of-time compiles the Angular components and bundles the app for production |
| frontend preview | `npm run preview` | Serves the production build locally |
| backend run | `sh mvnw spring-boot:run` | Starts the Spring Boot API on port 8000 (run from backend/) |
| docker services | `docker compose up -d` | Starts Postgres 16, Meilisearch, and two Redis instances defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer` | VS Code / Codespaces container configuration |
| `.quorq` | Quorq platform metadata (handoff.json, prepared.json) describing how this repo was generated/handed off |
| `backend` | Spring Boot (Java 21, Maven) API service |
| `backend/src/main/java/app` | Application entry point, controllers (HealthController, ApiController), auth, security, and model (JPA entity) packages |
| `backend/src/test` | JUnit unit and integration (*IT) tests for the backend |
| `frontend` | Angular 22 app (Vite + Analog) containing all approved UI screens |
| `frontend/src/screens` | One standalone Angular component per approved screen, each paired with a .spec.ts test |
| `frontend/src/lib` | Shared API client (api.ts), UI kit, icons, brand tokens, and screen-base helpers used by every screen |
| `frontend/e2e` | Playwright acceptance tests |
| `docker-compose.yml` | Local supporting services: Postgres 16, Meilisearch, and two Redis instances |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Frontend screens are standalone Angular components under src/screens/, one per approved screen, each with a colocated x.component.spec.ts test
- All API calls are meant to go through apiFetch (frontend/src/lib/api.ts), which attaches the bearer token (session token or shared secret) and resolves against API_BASE_URL
- screen-base.ts supplies shared navigate/brand utilities to every screen component
- Backend declares all API routes in a single ApiController; unimplemented endpoints return a placeholder via Stubs.notImplemented, while implemented ones (auth, consent) delegate to AuthService
- Backend JPA entities use explicit @Column mappings matching snake_case DB column names against camelCase Java fields
- Backend code style is enforced via Spotless (Google Java Format) and Checkstyle; frontend via ESLint and Prettier
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm test` | Runs Vitest component tests with Angular's TestBed (from frontend/) |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app; used as a development gate |
| frontend e2e | `npm run test:e2e` | Runs Playwright acceptance tests from frontend/e2e; builds/serves the app (and the backend) locally unless E2E_BASE_URL is set |
| e2e browser install | `npm run test:e2e:install` | Fetches the Chromium browser Playwright needs, before first e2e run |
| backend tests | `sh mvnw test` | Runs backend JUnit unit and integration (*IT) tests with JaCoCo coverage (from backend/) |
| backend style checks | `sh mvnw checkstyle:check spotless:check` | Verifies backend code against Checkstyle rules and Spotless formatting |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Backend fails to connect to a database on startup | Without a DATABASE_URL set it falls back automatically to an in-memory H2 database; if DATABASE_URL is set, ensure Postgres is running first via `docker compose up -d` |
| Sign-out / session revocation doesn't behave as expected | Redis (REDIS_URL) is optional for early token revocation; login and logout still function without it, just without immediate revocation, if Redis is unset or unreachable |
| Frontend screens show no live data or fail API calls | Screens currently render seeded sample data and are not yet wired to the backend; set VITE_API_BASE_URL if testing against a real API via lib/api.ts's apiFetch |
| Playwright e2e tests fail to start a browser | Run `npm run test:e2e:install` once to fetch Chromium before running `npm run test:e2e` |
| JWT-signed sessions behave unexpectedly across restarts | app.jwt.secret defaults to an insecure dev-only value (JWT_SECRET_KEY); set JWT_SECRET_KEY explicitly for any non-local run |
<!-- sdlc:auto:end troubleshooting -->
