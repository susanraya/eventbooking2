<!-- sdlc:auto:start adr -->
# ADR-0002: Use Spring Boot 4.1 for Backend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- Spring Boot 4.1
- Node.js/NestJS
- Django

## Decision Outcome

Chosen option: Spring Boot 4.1, because Approved stack. Spring's transaction management and Spring Security back the no-oversell booking path, consent records, role-based access and audit logging, and it integrates cleanly with RDS, Redis, S3 and the Razorpay/SendGrid/MSG91 SDKs.

## Consequences

Higher baseline memory and startup than lightweight runtimes, offset by mature transactional and security primitives this money-and-ticket domain needs.
<!-- sdlc:auto:end adr -->