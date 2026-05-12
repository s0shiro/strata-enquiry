# Strata AI Enquiry Tool (Prototype Scaffold)

This repository contains a full MVP scaffold for the AI Client Enquiry Processing tool:

- `frontend/` — React + Vite + Tailwind UI
- `backend/` — Express API + DigitalOcean Inference integration layer

## What it does

Staff can paste an enquiry, click **Analyse Enquiry**, and receive:

- Enquiry type
- Priority
- Summary
- Recommended action
- Suggested response

## Project setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend default URL: `http://localhost:5000`

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Environment variables

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DO_INFERENCE_API_KEY=your_digitalocean_inference_key_here
DO_INFERENCE_MODEL=your_selected_model_name_here
DO_INFERENCE_BASE_URL=https://inference.do-ai.run/v1
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

## API

### `POST /api/analyse-enquiry`

Request:

```json
{
  "enquiry": "Client enquiry text here"
}
```

Success response:

```json
{
  "type": "General Question",
  "priority": "Normal",
  "summary": "...",
  "recommended_action": "...",
  "suggested_response": "..."
}
```

Error examples:

```json
{ "message": "Enquiry text is required." }
```

```json
{ "message": "Enquiry is too long. Maximum length is 5000 characters." }
```

```json
{ "message": "The AI response was not valid JSON.", "raw": "..." }
```

```json
{ "message": "Failed to analyse enquiry." }
```
