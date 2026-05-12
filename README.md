# Strata AI Enquiry Tool

This repository contains the prototype for the Strata AI Enquiry Tool, designed to help staff efficiently analyse and respond to client enquiries.

## Architecture

- **Frontend:** A React 18 + Vite + Tailwind application for the staff-facing UI.
- **Backend:** An Express 5 API that securely handles communication with the DigitalOcean Inference API via the OpenAI SDK.

## Setup & Running the Application

There is no root-level setup; the frontend and backend operate as separate services.

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
By default, the backend runs on `http://localhost:5000`.

**Required Environment Variables (`backend/.env`):**
- `DO_INFERENCE_API_KEY`: Your DigitalOcean inference key.
- `DO_INFERENCE_MODEL`: Your selected model name.
- `DO_INFERENCE_BASE_URL`: Defaults to `https://inference.do-ai.run/v1`

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
By default, the frontend runs on `http://localhost:5173`.

**Environment Variables (`frontend/.env`):**
- `VITE_API_URL`: Points to the backend (defaults to `http://localhost:5000`).

## Design Decisions

- **Strict Schema Enforcement:** The backend enforces a strict JSON contract with the AI model via prompt engineering. It validates the response shape (`type`, `priority`, `summary`, `recommended_action`, `suggested_response`) before sending it to the frontend. This prevents UI rendering errors from unpredictable LLM outputs.
- **Backend Proxy for AI Calls:** The frontend never communicates directly with the AI provider. This keeps the API keys secure and allows the backend to handle input validation, prompt construction, and error parsing.
- **Input Validation:** A hard limit of 5000 characters is enforced on both the frontend (UX) and backend (security) to prevent abuse and excessive token usage.
- **Minimalist UI & Separation of Concerns:** The frontend uses Tailwind for a clean, slate-based palette. State management (`useAnalyseEnquiry`), API calls (`api.js`), and presentational components are cleanly separated to make future maintenance and testing easier.
- **Fail-Fast Configuration:** The backend is designed to crash early during startup if critical DigitalOcean Inference environment variables are missing, rather than failing silently or causing runtime errors when users submit forms.
