# QA Postgres Schema Plan

This backend should persist pipeline outputs from `rag/maritime_rag/outputs/outputN/` into Postgres through Prisma.

## Why Postgres is needed

`output2` is only a file snapshot of one pipeline run.

QA workflow needs persistent state for:

- QA login
- review decisions
- edited card versions
- publish gating
- review history
- later feedback learning

That state cannot stay inside JSON files.

## Source of truth

Import pipeline artifacts into DB through `qa-backend`:

- `flashcards.json`
- `evidence_units.json`
- optional run metadata from `usage.json`, `STATS.md`, `ocr.json`

The website should read from the database, not directly from the `outputN` folder.

## Core tables

- `QaUser`
  - QA reviewer/admin login records
- `QaSession`
  - refresh-token and logout/session invalidation support
- `PipelineRun`
  - one imported pipeline run
- `PipelineRunAsset`
  - references to `ocr.json`, `flashcards.json`, `source_pages.pdf`, images, and other artifacts
- `Flashcard`
  - the reviewable unit shown on the QA website
- `FlashcardSource`
  - linked evidence/source context for each card
- `FlashcardReview`
  - accept, reject, or accept-with-edit history

## Review-state model

`Flashcard.status` is the current QA state:

- `PENDING_REVIEW`
- `ACCEPTED`
- `ACCEPTED_WITH_EDIT`
- `REJECTED`

`FlashcardReview` stores the audit trail:

- original question/answer
- final edited question/answer
- rejection reason
- reviewer note
- version number
- current review pointer

## What should be imported from pipeline output

Minimum card payload to store:

- run identifier
- document title
- question
- answer
- card type
- subject
- topic
- quality score / verdict
- source page number
- source snippet
- OCR text
- evidence unit key
- image reference if the card is diagram-based

## Auth direction

Phase 2 auth is still temporary.

This schema already prepares the stronger auth path:

- JWT access token
- refresh token
- session invalidation
- logout route
- role-based QA access

## Next implementation step

After dependency install, the immediate backend tasks are:

1. add Prisma service/module
2. replace in-memory `QaDataService` with Prisma queries
3. create a seed QA user with password hash
4. implement `outputN` import mapping into `PipelineRun`, `Flashcard`, and `FlashcardSource`
5. switch review actions to persistent DB writes

## Neon env shape

For Neon, use:

- `DATABASE_URL` = pooled connection
- `DIRECT_URL` = direct non-pooled connection

This matches Prisma's recommended split where runtime can use pooling while migrations use the direct connection.
