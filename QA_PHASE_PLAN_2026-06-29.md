# QA Phase Plan

This file covers the QA track only.

The combined QA + user retrieval build order now also lives in:

- `IMPLEMENTATION_PLAN_QA_AND_RETRIEVAL_2026-06-29.md`

## Target Architecture

- public website remains in `maritribe-web` root
- hidden QA frontend lives in `maritribe-web/qa-app`
- QA NestJS backend lives in `maritribe-web/qa-backend`
- Python pipeline remains a separate service later
- public users see public pages only
- QA users access protected hidden review routes only

## Phase 1

### Goal

Lock the final repo structure without disturbing the public website.

### Deliverable

- public site kept intact
- hidden QA frontend scaffold created
- NestJS QA backend scaffold created
- repo structure documented clearly

### Depends on

- final decision that `maritribe-web` is the target repo
- final decision that backend should be NestJS inside `maritribe-web`

### Status

- done

## Phase 2

### Goal

Port the QA backend logic from the prototype/reference work into `maritribe-web/qa-backend`.

### Deliverable

- QA auth module
- QA review module
- QA ingest module
- review routes
- approved-card routes
- temporary import route
- protected QA auth flow

### Depends on

- Phase 1 complete
- reference logic available in `maritribe-backend`

### Status

- in progress

## Phase 3

### Goal

Add persistent data and real backend state in the final target app.

### Deliverable

- Prisma setup in `qa-backend`
- Postgres DB schema
- migration
- seeded QA user
- persistent auth and review storage

### Depends on

- Phase 2 complete
- Postgres confirmed

### Status

- ready to start

## Phase 4

### Goal

Build the hidden QA frontend screens using the same visual language as the existing website.

### Deliverable

- QA login page
- review queue
- run detail page
- card review page
- review history page
- no changes to public page design language

### Depends on

- Phase 1 complete
- Phase 2 API shape available

### Status

- in progress as scaffold only

## Phase 5

### Goal

Connect QA frontend to QA backend with mock/test data first.

### Deliverable

- QA login works end-to-end
- review queue loads from backend
- run detail loads from backend
- card review actions hit backend
- mock/import flashcards can be reviewed

### Depends on

- Phase 2 complete
- Phase 3 complete
- Phase 4 screens available

### Status

- pending

## Phase 6

### Goal

Implement full review workflow behavior.

### Deliverable

- accept flow
- reject flow
- accept-with-edit flow
- reviewer note
- rejection reason
- current vs edited tracking
- review history

### Depends on

- Phase 5 complete

### Status

- pending

## Phase 7

### Goal

Implement publish gating so only approved cards become user-visible.

### Deliverable

- approved-card API
- hidden pending cards
- hidden rejected cards
- edited approved cards visible with final values

### Depends on

- Phase 6 complete

### Status

- pending

## Phase 8

### Goal

Connect the real Python pipeline later without changing the QA workflow.

### Deliverable

- real pipeline ingest/callback contract
- source-linked flashcards from Python service
- same QA review flow working with real generated content
- import from `rag/maritime_rag/outputs/outputN`

### Depends on

- Phase 3 complete
- mock ingest contract already stable

### Status

- later

## Phase 9

### Goal

Expose approved cards safely to the eventual user-facing client.

### Deliverable

- Flutter or final user client consumes approved cards only
- no QA-only data leaks
- no pending/rejected cards exposed

### Depends on

- Phase 7 complete

### Status

- later

## Phase 10

### Goal

Add learning and quality-improvement loop from QA decisions.

### Deliverable

- current vs edited analysis
- rejection summary
- improvement signals for prompts/OCR/chunking
- context-learning foundation

### Depends on

- Phase 6 complete
- enough review data available

### Status

- later

## Current Practical Sequence

1. Phase 2
2. Phase 3
3. Phase 4
4. Phase 5
5. Phase 6
6. Phase 7
7. Phase 8
8. Phase 9
9. Phase 10
