# Funding Applicant OS — Web Interface

This folder contains the static product-facing interface for **Funding Applicant OS by Moonshine Capital**.

The visual layer is based on the Operator Capital / neo-brutalist fintech direction, but the content and UI metaphors are grounded in the actual `funding-applicant-ops` repository: Gmail intake, n8n orchestration, HubSpot CRM writing, dedupe, stage mapping, and follow-up task sequencing.

## Files
- `index.html`
- `styles.css`
- `script.js`

## Product Positioning
**Funding Applicant OS** is an applicant-operations layer designed to turn inbound funding signals into structured CRM action.

Current operating core:
- Gmail applicant parser
- normalized applicant payload
- HubSpot contact lookup
- deal dedupe
- deal create / update
- status + stage mapping
- follow-up task generation
- human exception handling
- operator documentation and troubleshooting

## Frontend Sections
1. Hero / product identity
2. Applicant Ops Snapshot
3. System Modules
4. Applicant Pipeline
5. Workflow Architecture
6. Follow-Up Engine
7. Human Operator Layer
8. Built Now / Next Layers
9. Closing CTA

## Current Status
This is a static visual interface only. The existing automation backend remains in the repository under:
- `workflows/gmail-parser-funding-applicants.json`
- `workflows/hubspot-funding-applicant-workflow.json`

The static site does not currently submit applicant data or modify CRM records.

## Recommended Deployment Path
1. Review and approve the static interface.
2. Add these files to the repo.
3. Deploy through Vercel.
4. Connect real actions only after visual approval.

## Next Integration Layers
- Wix Applicant Portal
- Multi-Agent n8n Router
- Notion Operator Dashboard

## Brand Lockup
**Funding Applicant OS**  
by **Moonshine Capital**
