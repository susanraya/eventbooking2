<!-- sdlc:auto:start adr -->
# ADR-0001: Use Angular 22 for Frontend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- Angular 22
- React
- Vue

## Decision Outcome

Chosen option: Angular 22, because Approved stack. Delivers the responsive SPA (register, consent, search, event detail, booking, my-tickets) with Angular's built-in forms and routing covering validation and empty-state UX across desktop and mobile browsers.

## Consequences

Opinionated and heavier than a minimal framework, but its batteries-included forms/HTTP tooling suits the CRUD-heavy flows and keeps the team on one conventional structure.
<!-- sdlc:auto:end adr -->