# Prisma Module

This module is the shared database access layer for the QA backend.

Purpose:

- connect NestJS to Postgres through Prisma
- provide one reusable `PrismaService`
- support the shift away from in-memory `QaDataService`

Current status:

- service/module added
- waiting on dependency install and generated Prisma client
- waiting on real `.env` with Neon or other Postgres URLs

Next replacement targets:

- `QaAuthService`
- `QaReviewService`
- `QaIngestService`
- `QaDataService`
