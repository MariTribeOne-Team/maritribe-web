# Phase 1 Port Plan

## Goal

Start the final QA implementation inside `maritribe-web` without changing the current UI language and without depending on the real pipeline.

## What was done in this phase

- created a dedicated fullstack QA app scaffold under `maritribe-web/qa-app`
- kept the same maritime green / gold / cream visual language as the current static site
- added initial QA pages:
  - `/`
  - `/qa/login`
  - `/qa/review-queue`
  - `/qa/review-queue/[runId]`
  - `/qa/cards/[cardId]`
- added initial fullstack API handlers:
  - `POST /api/qa-auth/login`
  - `GET /api/qa-auth/me`
  - `GET /api/qa/runs`
  - `GET /api/qa/runs/[runId]`
  - `GET /api/qa/cards/[cardId]`
- added mock QA user and mock run data so feature work can continue before real pipeline hookup

## Why this is the right first slice

- it keeps the visible UI direction stable
- it moves the QA work into the actual target app
- it avoids blocking on the real pipeline
- it gives a safe place to port the prototype backend logic

## What should be ported next from the prototype backend

From the reference work in `maritribe-backend`, the next logic to port is:

- QA auth model and real persistent QA user storage
- review endpoints
- approved-card endpoint
- mock/import ingest contract
- current-vs-edited review handling

## Next phase

1. add persistent data layer in the QA app
2. add review detail page
3. add accept / reject / accept-with-edit actions
4. add temporary import endpoint for mock flashcards and source context
5. replace mock session logic with real DB-backed QA auth
