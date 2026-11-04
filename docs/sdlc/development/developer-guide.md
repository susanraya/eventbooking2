# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `f22edbe` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
eventbooking2 is a generated two-app repository: an approved Angular 22 frontend (built with Vite via the Analog plugin) that currently renders seeded sample data for every reviewed screen, and a Spring Boot 4.1 (Java 21, Maven) backend that at this point only exposes a /health endpoint and stub/service classes, with no approved architecture built out yet. The approved stack target is Angular + Spring Boot + PostgreSQL on AWS, and docker-compose provides local Postgres, Meilisearch, and Redis services for future backend work.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js and npm (for the Angular/Vite frontend)
- Java 21 (backend uses the bundled Maven wrapper, no separate Maven install required)
- Docker and Docker Compose (for the Postgres/Meilisearch/Redis services in docker-compose.yml, and for building the backend's Docker image)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. Copy .env.example to .env and fill in any required values
3. cd frontend && npm install
4. cd backend && sh mvnw dependency:go-offline (optional, pre-fetches dependencies)
5. Optionally run docker compose up -d from the repo root to start Postgres, Meilisearch, and Redis for the backend
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the Angular/Analog frontend (run from frontend/) |
| frontend build | `npm run build` | Compiles the Angular components ahead-of-time via the Analog Vite plugin and bundles the app |
| frontend preview | `npm run preview` | Serves the production build locally |
| frontend typecheck | `npm run typecheck` | Runs the Angular compiler (ngc) over the app, including templates |
| backend run | `sh mvnw spring-boot:run` | Starts the Spring Boot API (run from backend/); falls back to an in-memory H2 database if DATABASE_URL is not set |
| docker services | `docker compose up -d` | Starts Postgres, Meilisearch, and Redis containers defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer` | VS Code/Codespaces development container configuration |
| `.quorq` | Quorq AI SDLC platform metadata (handoff.json) |
| `backend` | Spring Boot (Java 21, Maven) API service |
| `backend/src/main/java/app` | Application entry point, health controller, config, and service/stub classes |
| `backend/src/main/resources` | Spring configuration (application.properties) |
| `backend/src/test/java/app` | JUnit tests for the backend |
| `backend/docker` | HealthCheck.java, compiled into the Docker image for the container HEALTHCHECK |
| `frontend` | Angular 22 app (Vite + Analog) rendering the approved, seeded-data screens |
| `frontend/src` | Angular source: screens, app shell/routes, shared lib (api, ui, icons, navigate, screen-base), styles |
| `frontend/e2e` | Playwright end-to-end specs |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Frontend: one component per approved screen under src/screens/ (per frontend/README.md)
- Frontend: app.component.ts holds the navigation shell and route table
- Frontend: screens extend shared lib helpers (screen-base.ts for navigate/brand, ui.ts/icons.ts for shared directives/components/icons)
- Frontend: brand tokens live in src/lib/brand.ts and as CSS variables in src/index.css
- Frontend: component tests sit beside the component they cover (x.component.spec.ts next to x.component.ts), run by Vitest
- Frontend: all API access is centralized in src/lib/api.ts (apiFetch) with a bearer token (session token or shared secret); screens do not yet call it, using seeded sample data instead
- Backend: Spring Boot conventions - single package app, ddl-auto=update for JPA schema, globally quoted Hibernate identifiers
- Backend code style enforced via Spotless (Google Java Format) and Checkstyle (checkstyle.xml)
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm run test` | Runs Vitest component tests (Angular TestBed) in jsdom |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app (gate used by the platform) |
| frontend format check | `npm run format:check` | Checks Prettier formatting without writing changes |
| frontend e2e | `npm run test:e2e` | Runs Playwright acceptance tests from e2e/; builds/serves the frontend and backend locally unless E2E_BASE_URL is set |
| backend tests | `sh mvnw test` | Runs backend JUnit tests (including *IT integration tests) with JaCoCo coverage |
| backend style checks | `sh mvnw checkstyle:check spotless:check` | Verifies backend code against Checkstyle rules and Spotless formatting |
| backend auto-format | `sh mvnw spotless:apply` | Applies Spotless (Google Java Format) fixes to backend code |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| docker compose up fails or Redis containers conflict | docker-compose.yml maps both the redis and redis-queue services to host port 6379; only one can bind that port at a time, so adjust the port mapping for one of them before starting both |
| Backend fails to start without a database | No DATABASE_URL is required for local dev: application.properties/DatabaseUrlEnvironmentPostProcessor let the app fall back to the bundled in-memory H2 database; set DATABASE_URL to point at the docker-compose Postgres instance to use it instead |
| npm run test:e2e is slow or fails on first run | Without E2E_BASE_URL set, Playwright's webServer config builds and runs both the backend (via mvnw package) and the frontend (vite build + preview) before testing, which takes time on a cold Maven/npm cache; run npm run test:e2e:install first to fetch the Chromium browser |
| npm run build succeeds but npm run typecheck fails | vite build tree-shakes unused modules (e.g. src/lib/api.ts) so type errors like missing import.meta.env types can slip through; run npm run typecheck (ngc) to catch template and full-project type errors |
<!-- sdlc:auto:end troubleshooting -->
