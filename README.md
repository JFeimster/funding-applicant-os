# Funding Applicant OS — Moonshine Capital

**Funding Applicant OS** is the product-facing interface and applicant-operations reference layer. The current real email-intake runtime runs in [Partner Command Center](https://github.com/JFeimster/partner-command-center), **not n8n**.

## Current operating architecture

```text
Manual forward from an operator mailbox
  → Cloudflare Email Routing / Email Worker
  → Partner Command Center on Vercel: POST /api/intake-message
  → applicant / partner / unknown classification
  → applicant branch: /api/applicant-email-ingest
  → applicant identity resolution, case matching, parsing
  → HubSpot contact + funding deal upsert
  → Notion Funding Leads upsert
  → Google Sheets Master Applicants upsert
  → per-destination results; human reconciliation when needed
```

The private forwarding mailbox is configured outside this public repository. Never embed API credentials, inbound signatures, applicant PII, or funding documents in static website files.

**Source-of-truth runtime:** [Cloudflare intake documentation](https://github.com/JFeimster/partner-command-center/blob/main/docs/cloudflare-email-intake.md) and [October 11 intake reconciliation](https://github.com/JFeimster/partner-command-center/blob/main/docs/email-intake-reconciliation-2026-10-11.md). See [docs/current-runtime.md](docs/current-runtime.md) for details and caveats.

## Frontend files

- [index.html](index.html) — visual product page
- [styles.css](styles.css) — neo-brutalist Moonshine design system
- [script.js](script.js) — static reveal and illustrative status animation

The product page **does not read CRM data, forward email, submit applicant records, or trigger Cloudflare/Vercel writes**. Snapshot indicators and lifecycle stages are demo visuals. No new backend was created.

## n8n status — future reference only

The files below are **unactivated reference designs**, not the live intake path:

- [workflows/gmail-parser-funding-applicants.json](workflows/gmail-parser-funding-applicants.json)
- [workflows/hubspot-funding-applicant-workflow.json](workflows/hubspot-funding-applicant-workflow.json)

Do not deploy them alongside the current intake worker without first addressing overlapping triggers, duplicate writes, credential setup, association logic, and idempotency.

## Existing operator docs

- [agents.md](agents.md) — current and future workflow roles
- [docs/field-mapping.md](docs/field-mapping.md) — original n8n payload reference (not current schema)
- [docs/task-sequence.md](docs/task-sequence.md) — follow-up cadence / planned automation
- [setup-checklist.md](setup-checklist.md) — environment and original import steps
- [troubleshooting.md](troubleshooting.md) — failure patterns, including current live ingestion

## Next layers

1. Wix applicant portal sync (future; applicant-facing)
2. Multi-agent router / optional n8n adapters (future; preserve current runtime)
3. Notion operator command dashboard (future; avoid duplicate systems of record)

## Deployment

This repository is a static HTML/CSS/JS site; configure Vercel Framework Preset **Other** with repository root as its project root. No build command is required. Git integration may automatically deploy new commits if enabled; check project settings before promoting to production. Deployment of this site must not be treated as deployment of the Partner Command Center API.

## Operational note

An October 11, 2026 reconciliation found both successful writes and partial destination failures. The receipt, HubSpot contact/deal, Notion page, and Sheets row must be reconciled by message identity before replaying an event. A delivery-delay or bounce notice alone does not establish loss.
