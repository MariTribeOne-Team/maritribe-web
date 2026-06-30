# Maritime RAG + QA Implementation Plan

This plan extends the QA-only phases into a two-track build:

- hidden QA review workflow
- user-facing retrieval app

The public visual language must stay aligned with the existing `maritribe-web` HTML/CSS/JS website.

## Track A — QA Workflow

### Phase A1 — Repo and app structure

- keep public website intact
- keep hidden QA frontend in `qa-app`
- keep QA backend in `qa-backend`

Status:

- done

### Phase A2 — QA backend API foundation

- QA auth endpoints
- QA review endpoints
- QA ingest endpoint
- protected QA routes

Status:

- implemented and moved off mock routing shape

### Phase A3 — QA backend persistence

- Neon Postgres connection
- Prisma schema
- seeded QA user
- DB-backed auth
- DB-backed review state

Status:

- implemented for current QA flow

### Phase A4 — QA frontend completion

- QA login
- review queue
- run detail
- card detail
- review history
- card-focus redesign so flashcard review is clearer and less overwhelming

Status:

- implemented and connected to backend routes

### Phase A5 — QA publish workflow

- accept
- reject
- accept-with-edit
- publish gating
- approved-card read path

Status:

- in progress

## Track B — Retrieval App

### Phase B1 — Retrieval DB foundation

- add document/page/evidence-unit/flashcard retrieval schema
- add `pgvector`
- decide how retrieval tables and QA review tables coexist
- store embeddings in Postgres

Status:

- pending

### Phase B2 — Direct pipeline loader

- read `outputs/outputN/flashcards.json`
- read `embeddings.json`
- read `evidence_units.json`
- read `ocr.json`
- upsert loader into Postgres
- idempotent rerun support

Status:

- started conceptually, not completed

### Phase B3 — Asset storage

- decode diagram base64
- upload to Cloudflare R2
- store `image_url`
- store PDF / optional OCR artifacts

Status:

- pending

### Phase B4 — User retrieval UI

- flashcard gallery
- search
- filters
- quality badges
- diagram image rendering
- same maritime visual language as existing website

Status:

- starting now

### Phase B5 — RAG API

- `GET /api/cards`
- `POST /api/ask`
- Voyage query embedding
- pgvector similarity search
- Claude grounded answer
- retrieved source-card response

Status:

- pending

### Phase B6 — QA to user publishing connection

- decide whether public retrieval shows:
  - all imported cards
  - publishable cards only
  - QA-approved cards only
- enforce that rule in app/API

Status:

- pending

## Recommended Build Order

1. finish QA backend persistence enough to load and inspect runs
2. implement retrieval UI preview using current style system
3. replace large HTTP import with direct DB loader
4. add retrieval schema + pgvector
5. build real gallery API
6. build real ask API
7. connect QA approval rules to public visibility

## Immediate Goal

Show visible output fast without redesigning the site:

- retrieval preview screen
- ask preview screen
- existing QA screens still intact

Then continue phase by phase into the real DB + RAG flow.

## Next Active Phase

### Phase B2 + QA Nav Cleanup

This is the next concrete implementation step.

Scope:

- keep public retrieval routes separate from hidden QA routes
- make public nav show `Deck`, `Ask`, and a single `QA` entry only
- if QA is not logged in, `QA` should land on login
- if QA is logged in, `QA` should land on review queue
- remove confusing mixed public/QA nav states from public pages
- start replacing preview card data with loaded flashcards from pipeline output / DB path

Deliverable:

- consistent public-vs-QA navigation
- clear hidden QA entry behavior
- next loader step documented as the source of truth for “all flashcards”
- phase ready to move from preview cards to imported deck cards

Current execution:

- deck page now reads imported cards from the QA backend backed by Neon
- QA queue, run detail, card review, and review history are connected to backend routes
- direct import into Neon is already in place for the `output2` run

## Current QA UX Phase

### Card-Focus Review Pass

Scope:

- make the flashcard the first and clearest visual element on the review screen
- keep review actions obvious but secondary to the card itself
- move source context, OCR text, guidance, and history into lower-priority expandable sections

Deliverable:

- faster QA comprehension of what is being reviewed
- less overwhelming card screen
- better alignment with a real reviewer workflow

Current progress in this pass:

- run review defaults to pending cards first
- latest-decision history now hides stale review versions
- reviewer label now resolves toward username-style identity
- answer blocks are rendered more readably on the review screen
- source context labels are clearer about PDF context vs OCR

Next QA UX fixes:

- replace generic run card rows with a stronger card-first review list layout
- add previous/next pending controls directly on the card screen
- tighten the public-vs-QA entry flow so `QA` feels hidden but still reachable
- move from plain components toward a shared component layer based on `shadcn/ui` plus Radix primitives

## Revised Flow Plan

This replaces the current fragmented UX direction with one cleaner end-to-end flow.

### Problems In Current Flow

- public pages and QA pages feel like separate products
- navbar behavior changes too much between screens
- login is too visible/noisy in the wrong places
- there are too many intermediate screens that do not help the user complete a task
- deck and QA are too tightly mixed in messaging
- large DB-backed runs are too heavy when loaded at once
- fallback screens and temporary routes created confusion in navigation
- public copy reads like backend/developer explanation instead of product UX copy
- reviewer identity is not clearly presented as a real username/display name

### Target Principles

- one visual system
- one navbar pattern
- one clear public flow
- one clear QA flow
- no unnecessary intermediary pages
- no loading of full runs in one request
- card is always the focal point during review
- user-facing copy should explain purpose, not infrastructure
- reviewer identity should always show username/display name, not role text

## Final User Flows

### Public Flow

1. Landing
- purpose: explain product briefly and direct users
- navbar: `Deck`, `Ask`, `QA`
- `QA` should be low-emphasis compared to `Deck` and `Ask`

2. Deck
- public-facing flashcard preview/gallery
- should not feel like an admin screen
- should show curated or approved content only once publish rules are finalized

3. Ask
- public-facing RAG query screen
- should stay parallel to Deck, not mixed with QA workflow language

### QA Flow

1. QA Login
- only appears when user intentionally enters QA
- not a primary public navigation destination

2. Review Queue
- first reviewer screen
- shows runs only
- each run row shows: name, counts, status, `Open run`
- no heavy run data loaded here

3. Run Review
- opens one run
- loads first page only
- default page size: `20` or `50`
- search/filter only within current paginated dataset or via backend query params
- reviewer should immediately see pending cards first

4. Card Review
- card is the hero
- decision block is next
- context and history are secondary
- reviewer can go `Previous`, `Next pending`, `Next card`

5. Review History
- separate audit screen
- should not be part of the normal decision path
- used for traceability, not primary workflow

## Navbar Plan

### Public Navbar

- `Deck`
- `Ask`
- `QA`

Rules:

- same brand block on all public screens
- same spacing and active-state behavior
- `QA` takes user to login if no QA session exists

### QA Navbar

- `Queue`
- `History`
- `Logout`

Rules:

- remove unnecessary `QA Login` item once logged in
- do not show public deck messaging inside QA screens
- do not keep switching labels between pages

Decision:

- no mixed navbars
- public navbar for public screens
- QA navbar for QA screens only

## Copy System Plan

### Public Copy Rules

- remove backend terms like `Neon`, `QA backend`, `source of truth`, `review flow` from visible product copy
- deck page should talk about flashcards, topics, learning, and review status only where needed
- home page should explain the platform simply, not the implementation
- ask page should sound like a learner tool, not an engineering prototype

### QA Copy Rules

- QA pages should sound operational and task-oriented
- avoid demo/dashboard wording like `Current system`, `Backend status`, `Review intake` if those sections are not essential
- replace buzz/explanatory helper panels with direct, useful reviewer instructions

### Reviewer Identity Rules

- always show `qaUserName` or configured display name
- do not show role text like `QA Reviewer` as the visible reviewer identity
- if display name is missing, fallback order should be:
  1. username/display name
  2. email
  3. internal ID

## UI Component Strategy

Current state:

- `qa-app` currently uses custom CSS only
- no `shadcn/ui`, `Radix`, `Magic UI`, or `Aceternity` layer is installed yet

Recommended approach:

### Foundation

- use `shadcn/ui` + `Radix UI` as the primary component base
- this should handle:
  - buttons
  - dialogs
  - dropdowns
  - accordion/details patterns
  - tabs
  - form inputs
  - badges
  - sheets/drawers if needed

### Controlled Visual Enhancements

- use `Magic UI` or `Aceternity UI` selectively only where they support the existing premium product feel
- do not let decorative components override the maritime visual language
- use them for:
  - hero polish
  - animated section reveals
  - subtle visual emphasis
- do not use them for reviewer-critical flows if they reduce clarity

Decision:

- `shadcn/ui` + `Radix UI` for core product/QA interaction components
- `Magic UI` / `Aceternity UI` only as optional enhancement layers

## Screen Reduction Plan

### Keep

- Landing
- Deck
- Ask
- QA Login
- Review Queue
- Run Review
- Card Review
- Review History

### Remove Or Avoid

- temporary preview/fallback review surfaces inside the queue page
- duplicate deck messaging that repeats backend implementation details
- noisy backend-status panels in reviewer-critical paths
- screens whose only purpose is explaining what the next screen already does

## Data Loading Plan

### Required Backend Pattern

1. Queue endpoint
- returns run summaries only

2. Run detail endpoint
- returns run summary only

3. Run cards endpoint
- paginated
- supports:
  - `page`
  - `limit`
  - `status`
  - `query`
  - optional `sort`

4. Card detail endpoint
- returns one card only with context and history

5. Review submit endpoint
- writes accept/reject/edit decision

### Loading Rules

- never load all `1525` cards in one request
- default first load should be `20` or `50` cards
- prefer server pagination over frontend-only chunking
- backend filtering should be added so search does not require fetching all cards

### Recommended Review Pagination

- queue: run summaries only
- run page first load: `20` cards
- optional page size controls later: `20 / 50 / 100`
- card page: single card only

## Performance Plan

### Immediate

- paginated run review
- no full-run preload
- no queue-page embedded run-card expansion
- no large source blobs in list responses if not needed

### Next

- backend search params for run cards
- lightweight list response shape for run-card listing
- separate detailed card payload only for card-review page

### Later

- prefetch next page
- cache recent run summary
- queue prioritization by pending count / freshness

## Content And UX Direction

### Deck

- should read like product content, not ops/admin tooling
- remove backend-explaining copy from visible product text
- focus on cards, topics, and learning value

### Review Queue

- should read like a work queue, not a dashboard demo
- counts are useful
- extra explanation panels should be reduced or removed

### Card Review

- should feel like reviewing one card, not reading a database dump
- keep source/OCR/history accessible but not dominant

## Phase Plan From Here

### Phase 1 — Flow Cleanup

- unify navbar behavior
- remove redundant QA/public messaging
- remove unnecessary helper panels in core screens
- lock final screen list
- define final copy rules for public vs QA surfaces
- define reviewer-name display rule
- lock chosen component system (`shadcn/ui` + `Radix`)

Deliverable:

- clear public flow
- clear QA flow
- consistent navigation labels
- consistent copy tone
- consistent reviewer identity display

### Phase 2 — Data Loading Cleanup

- keep queue lightweight
- enforce paginated run review
- add backend filtering params for run cards
- ensure card detail loads individually

Deliverable:

- no full-run loading
- stable run open behavior
- faster review flow

### Phase 3 — Run Review UX

- prioritize pending cards
- add clear row actions
- add next/previous/pending navigation
- reduce visual noise in run screen
- remove duplicate review appearances for the same card from the active queue
- ensure rejected cards leave the pending queue immediately
- show only active reviewable cards in queue/run views

Deliverable:

- efficient reviewer movement through cards
- queue reflects current review state correctly

### Phase 4 — Card Review UX

- keep card as hero
- simplify decision block
- collapse supporting detail
- improve original-vs-edited clarity
- improve answer formatting for worked solutions
- show step-by-step solution formatting line by line where possible
- differentiate OCR text from real source/PDF context
- show source excerpt / evidence context clearly and separately from OCR residue

Deliverable:

- obvious, low-friction review screen
- readable answers and source context

### Phase 5 — Public Deck / Ask Cleanup

- rewrite product-facing copy
- remove implementation buzz from public pages
- align deck and ask with final product tone
- reduce overwhelm in card preview/gallery
- ensure deck preview cards are intentionally curated in layout and text density

Deliverable:

- public-facing experience feels intentional and polished

## Approval Gate

Proceed with implementation only after confirming:

1. final screen list is accepted
2. public navbar vs QA navbar split is accepted
3. paginated run review is accepted as the only supported data-loading path
4. public deck should remain separate from reviewer workflow
