<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- MongoDB

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved stack. Row-level locking and ACID transactions guarantee stock is never oversold and each QR id is unique, and accurate storage of orders and payments, all hosted on RDS in Mumbai for residency.

## Consequences

A single relational primary needs read scaling later, acceptable at this MVP volume; jsonb covers flexible consent-purpose storage without a second datastore.
<!-- sdlc:auto:end adr -->