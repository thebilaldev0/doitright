# Rightwing / doitright.in

## Original problem statement
Build a simplistic, modern, attractive single-page website for Rightwing (doitright.in) based on the uploaded pitch deck theme. It should present the all-in-one services platform and collect requirements with validation.

## Architecture decisions
- React + TypeScript frontend with a responsive single-page layout.
- FastAPI backend endpoint at `POST /api/requirements` for validated form submissions.
- Supabase PostgreSQL will store requirements once `DATABASE_URL` is added to `backend/.env`.
- The current environment intentionally keeps Supabase unconfigured; the API returns a clear 503 and the UI shows an error rather than pretending a submission succeeded.

## Implemented
- Rightwing dark mineral visual system with cyan/gold accents, editorial typography, glass-like cards, responsive layout, hero, services, method, proof, CTA, footer.
- Requirement modal with name, email, phone, service, timeline, message validation and success/error states.
- Desktop and mobile navigation, including working mobile menu and CTA.
- FastAPI validation for all requirement fields and database insert path.
- `requirements_schema.sql` for the Supabase table.

## Prioritized backlog
- P0: Add Supabase Transaction Pooler `DATABASE_URL` and run `requirements_schema.sql` in the Supabase SQL editor.
- P1: Add real Rightwing testimonials, service descriptions, and pitch-deck-approved copy once supplied.
- P2: Add analytics and an internal requirements inbox.

## Next tasks
1. Add the Supabase connection string to `backend/.env`.
2. Create the `requirements` table using `backend/requirements_schema.sql`.
3. Submit a real requirement and confirm it appears in Supabase.