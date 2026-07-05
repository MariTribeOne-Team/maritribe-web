# QA Context Status

Last updated: 2 Jul 2026

## Purpose
This file is the working context for the QA review system inside `maritribe-web`.

It explains:
- what is already built
- what currently works
- what is still mock or partial
- what is left to implement next

## Repo Structure

### QA frontend
- `maritribe-web/qa-app`
- Next.js app for:
  - QA login
  - review queue
  - run-level card browsing
  - card review
  - review history
  - public deck preview
  - public ask preview

### QA backend
- `maritribe-web/qa-backend`
- NestJS backend for:
  - QA auth
  - run ingestion
  - card retrieval
  - review actions
  - approved cards feed
  - Prisma/Postgres persistence

## What Is Already Built

### 1. QA auth foundation
Implemented in backend:
- `QaUser`
- `QaSession`
- JWT-based QA auth flow
- login/logout/me routes
- session storage and refresh-token-ready schema

Implemented in frontend:
- QA login page
- session read/write flow
- protected QA pages that redirect to login if session is missing

### 2. Postgres QA schema foundation
Implemented in `qa-backend/prisma/schema.prisma`:
- `QaUser`
- `QaSession`
- `PipelineRun`
- `PipelineRunAsset`
- `Flashcard`
- `FlashcardSource`
- `FlashcardReview`

Current review states:
- `PENDING_REVIEW`
- `ACCEPTED`
- `ACCEPTED_WITH_EDIT`
- `REJECTED`

### 3. Run import foundation
Implemented:
- import path for pipeline outputs into DB
- run creation
- flashcard creation
- source/evidence context storage
- review counter recalculation

Current import sources:
- `flashcards.json`
- `evidence_units.json`
- optional metadata references

Important current limitation:
- import flow currently stores JSON asset references
- source PDF asset storage is not fully wired yet

### 4. QA review flow foundation
Implemented in backend:
- list runs
- get run
- get run cards with pagination
- get card
- get card reviews
- submit review
- list recent reviews
- list approved cards

Implemented in frontend:
- review queue page
- run detail page
- one-card review page
- review form
- review history page

Review behavior currently supported:
- accept
- accept with edit
- reject
- review audit history per card

### 5. Source-context text display
Already stored / shown:
- `sourceSnippet`
- `sourceText`
- `ocrText`
- `sourcePageNumber`
- `sourceEvidenceUnitKey`

Current QA card page already shows:
- PDF source excerpt
- stored source context
- raw OCR text if distinct
- page number

### 6. Public preview foundation
Implemented in QA app:
- public deck preview page
- public ask preview page

These are still preview/demo surfaces and not the final production retrieval app.

## What Is Working Right Now

### Backend
- QA backend schema exists
- auth module exists
- review module exists
- ingest module exists
- card/runs/reviews APIs exist

### Frontend
- reviewer can log in
- reviewer can open review queue
- reviewer can open a run
- reviewer can open one card
- reviewer can submit accept / edit / reject
- reviewer can see review history

### Data model
- cards are DB-backed
- reviews are DB-backed
- run counters are DB-backed
- source page number is DB-backed

## What Is Still Partial Or Temporary

### 1. DB environment
- QA backend was initially tested on a temporary Neon DB
- new final DB connection details have now been provided
- backend still needs final cutover and verification against the intended DB

### 2. Source PDF asset handling
Schema support exists through `PipelineRunAsset` and `SOURCE_PAGES_PDF`
but the actual workflow is incomplete.

Current gap:
- the source PDF is not yet consistently stored as a linked run asset during import
- there is no dedicated backend source-preview endpoint for card-to-PDF lookup
- the frontend cannot yet render actual PDF page previews

### 3. Asset delivery strategy
Not finalized yet:
- whether source PDFs will be stored as backend file paths
- or object storage keys / signed URLs
- or a later R2-backed private asset flow

### 4. Review UX polish
Still needs cleanup:
- card page layout and answer formatting improvements
- stronger source-context presentation
- page-preview-first review flow
- tighter queue behavior after review actions

## What Is Left To Implement

## A. Real DB cutover
Goal:
Use the intended Neon DB as the QA system database.

Remaining work:
- set final `DATABASE_URL`
- set final `DIRECT_URL`
- run Prisma against the real DB
- verify auth, runs, cards, and reviews on that DB

## B. Source PDF asset persistence
Goal:
Make every pipeline run store its actual source PDF as a run asset.

Remaining work:
- update import flow to create `PipelineRunAsset` row for `SOURCE_PAGES_PDF`
- store:
  - file name
  - storage path or object key
  - URL if available
  - metadata as needed

## C. Backend source-preview contract
Goal:
Allow QA UI to fetch the real source document info for a card.

Remaining work:
- add backend endpoint for card source lookup
- return:
  - run id
  - page number
  - source snippet
  - OCR/source text
  - source PDF asset URL/path/key

## D. PDF page preview in QA UI
Goal:
Show actual PDF pages, not only text excerpts.

Remaining work:
- add PDF preview section on QA card page
- use page number already stored on the card
- support:
  - current page preview
  - open full PDF
- optionally later:
  - previous page
  - next page

## E. Hardening review flow
Goal:
Make review state changes and queue behavior more reliable.

Remaining work:
- ensure queue reflects latest review state immediately
- ensure rejected cards do not stay incorrectly in pending flows
- clean up edit/reject edge cases
- improve audit clarity in review history

## F. Future optional improvements
Later, if needed:
- signed private asset URLs
- pre-generated page thumbnails
- PDF page image previews instead of direct PDF rendering
- richer evidence/source panel
- internal admin tools for run repair/re-import

## Recommended Immediate Order

1. real DB cutover
2. source PDF asset persistence
3. backend source-preview endpoint
4. QA UI PDF page preview
5. review-flow hardening

## Current Practical Summary

The QA system is no longer just a mock UI.

What exists now is a real foundation:
- auth exists
- DB schema exists
- review APIs exist
- run/card/review pages exist
- source text context exists

What is still missing for the intended reviewer experience:
- final DB cutover
- source PDF asset linking
- actual PDF page preview on the review screen

That PDF/source-page feature is the next major QA improvement.
