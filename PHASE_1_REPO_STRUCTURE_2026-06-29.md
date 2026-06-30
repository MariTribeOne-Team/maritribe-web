# Phase 1 Repo Structure

## Goal

Set the repo up so the final direction is clear:

- existing public website remains intact
- hidden QA frontend stays in the same repo
- QA backend is a NestJS service in the same repo
- no further implementation should rely on `maritribe-backend` as the final home of this feature

## Current Structure After Phase 1

### Public site

These remain the visible public website and should not be disrupted:

- `index.html`
- `about.html`
- `episodes.html`
- `episode-1.html`
- `post.html`
- `styles.css`
- supporting public content pages

### Hidden QA frontend

Current hidden QA frontend scaffold:

- `qa-app/`

This is the UI/reference direction for:

- QA login
- review queue
- run detail
- card review

It keeps the same visual language as the public site.

### QA backend service

New NestJS backend scaffold:

- `qa-backend/`

This is the final home for:

- QA auth
- review APIs
- approved-card APIs
- temporary import / later pipeline callback

## How To Think About It

- `maritribe-backend` QA work = prototype/reference
- `maritribe-web/qa-backend` = final backend target
- `maritribe-web/qa-app` = hidden QA frontend target
- root static pages = public site

## Next Phase

1. port QA backend logic from the prototype into `qa-backend`
2. connect `qa-app` to `qa-backend`
3. keep public pages unchanged
4. keep QA hidden and protected

## Phase 2 Progress

Phase 2 starts by bringing the real QA service shape into `qa-backend` with:

- `qa-auth`
- `qa-review`
- `qa-ingest`
- in-memory/mock storage first

This avoids blocking on DB rollout while still giving the final NestJS route structure.
