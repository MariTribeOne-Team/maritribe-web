# maritribe-web QA Structure

## Public Site

These files remain the visible public website and should not be broken while QA work is added:

- `index.html`
- `about.html`
- `episodes.html`
- `episode-1.html`
- `post.html`
- `styles.css`
- other supporting public content pages

The current visual language of these files is the design source for QA pages.

## Hidden QA Frontend

Hidden QA frontend lives under:

- `qa-app/`

Purpose:

- QA login
- review queue
- run detail
- card review
- review history

Important rules:

- QA pages must stay hidden from public navigation
- QA pages must use the same visual language as the public site
- QA pages should not force a redesign of the current website

## QA Backend

QA NestJS backend lives under:

- `qa-backend/`

Purpose:

- QA auth
- QA review APIs
- approved-card APIs
- temporary mock import
- later real pipeline callback
- Postgres persistence via Prisma

Important rule:

- this is the final backend target for QA inside `maritribe-web`
- `maritribe-backend` QA work is reference/prototype only

## Separate Pipeline

The Python pipeline remains separate from this repo.

It will later:

- generate OCR/evidence/flashcards
- send structured output into the QA backend
- provide `outputN` artifacts that are imported into Postgres and then shown on the QA website

## Phase 1 Result

After phase 1, the repo is split into:

- public website
- hidden QA frontend
- NestJS QA backend

That is the baseline for all later phases.
