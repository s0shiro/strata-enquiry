# AGENTS.md

## Project Overview

This repository is a prototype for the Strata AI Enquiry Tool.

- `frontend/` is a React 18 + Vite + Tailwind app for staff-facing enquiry analysis.
- `backend/` is an Express 5 API that sends prompts to DigitalOcean Inference through the OpenAI SDK.

Core flow:

1. A user pastes an enquiry into the frontend form.
2. The frontend posts to `POST /api/analyse-enquiry`.
3. The backend validates input, calls the AI model, parses JSON, and validates the response shape.
4. The frontend renders the structured result.

## Working In This Repo

- There is no root `package.json`. Run commands inside `frontend/` or `backend/`.
- Use `npm`, since each app is committed with `package-lock.json`.
- Do not edit `node_modules/` or `dist/`.
- Do not commit `.env` files. Use the provided `.env.example` files.

## Local Setup

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Default URL: `http://localhost:5000`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Default URL: `http://localhost:5173`

## Environment Variables

### Backend

Required for startup:

- `DO_INFERENCE_API_KEY`
- `DO_INFERENCE_MODEL`
- `DO_INFERENCE_BASE_URL`

Other backend settings:

- `PORT` defaults to `5000`
- `NODE_ENV` defaults to `development`
- `FRONTEND_URL` defaults to `http://localhost:5173`

The backend fails fast if any required DigitalOcean inference variable is missing.

### Frontend

- `VITE_API_URL` defaults to `http://localhost:5000`

## Repo Map

### Backend

- `src/server.js`: bootstraps the HTTP server
- `src/app.js`: Express app setup
- `src/routes/enquiry.routes.js`: API routes
- `src/controllers/enquiry.controller.js`: request handling
- `src/validators/enquiry.validator.js`: input validation
- `src/services/ai.service.js`: model call
- `src/services/enquiry.service.js`: JSON parsing and response validation
- `src/prompts/enquiry.prompt.js`: system prompt and user prompt builder
- `src/middlewares/`: 404 and error handling

### Frontend

- `src/pages/HomePage.jsx`: main page composition
- `src/hooks/useAnalyseEnquiry.js`: form state and submission flow
- `src/features/enquiry/api.js`: API client
- `src/features/enquiry/constants.js`: UI-facing constants
- `src/components/enquiry/`: enquiry-specific UI
- `src/components/ui/`: shared presentational primitives
- `src/layouts/AppLayout.jsx`: shell layout

## Critical Contracts

Keep these in sync whenever you change business rules.

### AI response shape

The backend expects the model to return JSON with exactly these fields:

```json
{
  "type": "",
  "priority": "",
  "summary": "",
  "recommended_action": "",
  "suggested_response": ""
}
```

If you add, remove, or rename fields, update all of the following together:

- `backend/src/prompts/enquiry.prompt.js`
- `backend/src/services/enquiry.service.js`
- `frontend/src/features/enquiry/types.js`
- `frontend/src/components/enquiry/ResultCard.jsx`

### Allowed enquiry types and priorities

These values are enforced in multiple places.

If you change enquiry types or priorities, update all relevant files together:

- `backend/src/prompts/enquiry.prompt.js`
- `backend/src/services/enquiry.service.js`
- `frontend/src/features/enquiry/constants.js`
- `frontend/src/components/enquiry/PriorityBadge.jsx` if badge treatment needs to change

### Max enquiry length

The max length is currently `5000` characters and is duplicated in:

- `backend/src/validators/enquiry.validator.js`
- `frontend/src/features/enquiry/constants.js`
- frontend form behavior through `useAnalyseEnquiry` and `EnquiryForm`

If you change it, update both backend validation and frontend UX at the same time.

## Prompt Editing Guidance

- Preserve the instruction that the model must return valid JSON only.
- Keep the expected JSON structure explicit in the prompt.
- Be careful with wording changes that could make the model add prose or markdown.
- If prompt behavior changes, verify both successful parsing and invalid-response handling.

## Code Style

Match the existing codebase unless the user asks for a broader refactor.

- JavaScript only, using ESM imports/exports
- Double quotes and semicolons
- Small functional React components
- Tailwind utility classes for styling
- Lightweight JSDoc only where it adds value

The current UI is intentionally simple and uses a restrained slate-based palette. Preserve that feel unless the task explicitly calls for a redesign.

## Validation And Errors

- Backend validation errors should use `createHttpError(...)`.
- Backend error responses are JSON with a `message` field.
- Frontend API failures should surface a user-friendly message.
- Preserve the distinction between invalid user input, invalid AI JSON, and generic backend failure.

## Verification

Run the checks that exist before wrapping up changes.

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

There is currently no lint or test script. At minimum:

```bash
cd backend
npm run dev
```

Use valid environment variables when starting the backend.

### Manual smoke test

With both apps running:

1. Paste a normal enquiry and confirm a result renders.
2. Submit an empty enquiry and confirm validation messaging appears.
3. Try an over-limit enquiry and confirm frontend and backend stay aligned.

You can also verify the API directly:

```bash
curl -X POST http://localhost:5000/api/analyse-enquiry \
  -H "Content-Type: application/json" \
  -d '{"enquiry":"The tenant reported water leaking from the ceiling and needs urgent help."}'
```

## Safe Change Patterns

- For prompt or schema changes, update backend validation and frontend rendering in the same pass.
- For UI-only changes, avoid silently drifting from backend constraints.
- For backend-only changes, preserve the `POST /api/analyse-enquiry` contract unless the task includes a frontend update.
- If you introduce shared constants later, make that a deliberate refactor rather than a partial move.
