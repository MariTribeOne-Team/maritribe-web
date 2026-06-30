# QA Change Log — 2026-06-29

This file tracks QA-side implementation changes in `maritribe-web`.

## Initial baseline

- hidden QA frontend exists in `qa-app`
- QA NestJS backend exists in `qa-backend`
- Neon + Prisma backend foundation exists

## Added in this update

- created this maintained QA change log
- started the next QA-focused frontend phase from the current stop-point
- connected the QA card screen toward real review actions instead of placeholder buttons
- added review history read path on the QA frontend
- added QA review submit proxy route on the frontend
- added QA-wide review history page
- added QA logout flow

## Next QA steps

- complete review form polish
- add review history page if needed separately
- connect import-loaded runs/cards to the QA queue end to end
- make approved/rejected counts clearly visible after actions

## Added in navigation cleanup update

- clarified that public deck/ask pages and hidden QA pages are separate surfaces
- next phase now explicitly includes route cleanup plus real flashcard-loading work

## Added in output visibility update

- deck page switched from small preview cards to the real `output2/flashcards.json` file
- prepared the next direct-import step so the same output can be loaded into DB without the large HTTP request path

## Added in direct-import optimization update

- confirmed the direct importer creates the `output2` run in Neon
- started optimizing the importer so all flashcards can be loaded fast enough for QA review use
- improved the QA run-detail experience so imported runs are actually reviewable with search and status filters

## Added in QA session handling update

- QA pages now clear stale/invalid session cookies and redirect back to login instead of crashing on `Invalid QA token`
- removed the shared QA guard helper and inlined that handling in the page routes to avoid unstable dev runtime behavior

## Added in QA backend-availability update

- QA pages now handle backend connection failure more gracefully instead of crashing on `fetch failed`

## Added in Neon deck + QA cleanup update

- deck page switched from local output-file wording to Neon-backed backend wording
- added backend `GET /cards` route so the visible deck can read imported cards from Neon
- removed stale `DB next`, `preview`, and prototype QA copy from key screens
- QA queue language now reads as real review intake instead of a mock/prototype flow
- added a temporary compatibility shim for the old deck import path to reduce stale Next dev-bundle breakage
- verified both `qa-backend` and `qa-app` still build successfully after these changes

## Added in card-focus redesign update

- reworked the QA card screen so the flashcard itself is the primary visual focus
- moved source context and reviewer guidance into expandable secondary sections
- pushed review history below the decision block and reduced its visual weight
- simplified the review decision block so action choice is clearer before any edit/reject details appear

## Added in queue-flow and copy cleanup update

- run review now defaults to pending cards instead of all statuses
- reduced initial visible-card load so review runs are less overwhelming
- review submit now returns the reviewer to the run queue instead of leaving them stranded on the same card
- current review history now lists only the latest decision per card instead of showing stale versions as separate active outcomes
- reviewer identity display now prefers a username-style value instead of role-like text
- card answer display now formats method/step-heavy answers into readable blocks
- source context labels now distinguish stored PDF context from raw OCR extract more clearly
- login, queue, history, and public-entry copy were cleaned up to read like product UX instead of backend notes
- verified both `qa-app` and `qa-backend` still build successfully after these changes
