# Current runtime — forwarded-email applicant intake

**Verified from source:** `JFeimster/partner-command-center`, including `api/intake-message.js`, `api/applicant-email-ingest.js`, `lib/hubspot-client.js`, `docs/cloudflare-email-intake.md`, and `docs/email-intake-reconciliation-2026-10-11.md`.

## Production operator entry

An operator manually forwards a funding/applicant notification to the configured private inbox (currently `intake@myfunding.site`). Cloudflare Email Routing and its Worker pass the message to Partner Command Center on Vercel.

```text
manual forwarded message
    ↓
Cloudflare Email Routing → Email Worker
    ↓
POST /api/intake-message (Partner Command Center / Vercel)
    ├── partner → /api/partner-email-ingest
    ├── applicant → /api/applicant-email-ingest
    └── unknown → review_required
                  ↓
       parse + resolve applicant identity
                  ↓
        HubSpot / Notion / Sheets
                  ↓
       per-destination result + operator review
```

The `/api/intake-message` endpoint requires the trusted server API key; browser-side code must never expose the key.

## Applicant persistence

- **HubSpot** — contact email lookup / safe upsert, funding deal matching, stage and next-step mapping. Ambiguous matches are errors for review, not guessed.
- **Notion** — Funding Leads by normalized identity; preserve existing lead when possible.
- **Google Sheets** — `Master Applicants` ledger by normalized email/dedupe key, retaining HubSpot/Notion record IDs.
- **Source event IDs** — retained for audit and replay detection.

The server continues attempting independent destinations when others fail. An accepted intake event may be `accepted`, `accepted_with_errors`, `accepted_with_gaps`, or `review_required`. **Accepted is not equivalent to all destinations succeeding.**

## Follow-up operations

The +2/+4/+7/+12 follow-up cadence is a documented operator playbook in `docs/task-sequence.md`. The current forwarded-email handler does **not** automatically construct the entire task sequence or verify that Jason has replied. Do not present that behavior as live.

## Operational safety

- Preserve original message identity and avoid blind replay.
- Verify the destination records before retrying or backfilling.
- Do not publish applicant names, account details, email bodies, API keys, or provider tokens in this public repo.
- Keep n8n workflows as reference only until deliberately integrated.
- Do not create a duplicate intake backend in this repo; Partner Command Center owns routing and persistence.
- Never read applicant details directly from HubSpot, Notion, or Sheets from browser-side static JS.

## Production observability

`GET /api/intake-health` reports **configuration readiness**, not per-message successful writes. Reconcile `[email-intake-receipt]`, `[intake-message]`, `[applicant-email-ingest]` logs and destination IDs. The October 11 report documented 23 applicant reconciliation records with destination errors out of a 27-record scan; it did not establish a count of missing unique emails.

## Implementation boundary

This repo is the **visual frontend and domain reference**. The working API and Cloudflare Worker are in `partner-command-center`. Future work may add an authenticated status API adapter, but only by consuming approved server-side endpoints without duplicating writes or exposing applicant PII.
