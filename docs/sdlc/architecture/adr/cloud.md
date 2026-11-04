<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Approved stack. The Mumbai (ap-south-1) region keeps storage, database and backups inside India for DPDP/RBI posture, offers CloudWatch 180-day log retention for CERT-In, and hosts Razorpay-adjacent workloads comfortably.

## Consequences

Cloud-provider lock-in via RDS/S3/ElastiCache, accepted in exchange for managed India-region compliance and operational simplicity.
<!-- sdlc:auto:end adr -->