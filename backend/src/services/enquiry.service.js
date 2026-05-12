import { requestEnquiryAnalysis } from "./ai.service.js";
import { parseJsonSafely } from "../utils/parse-json.js";
import { createHttpError } from "../utils/api-response.js";

const ALLOWED_TYPES = new Set([
  "New Client",
  "Support Request",
  "Complaint",
  "General Question",
  "Maintenance Request",
  "Billing/Invoice Question",
  "Urgent Issue",
]);

const ALLOWED_PRIORITIES = new Set(["Low", "Normal", "High", "Urgent"]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateAiResponseShape(result) {
  const requiredKeys = [
    "type",
    "priority",
    "summary",
    "recommended_action",
    "suggested_response",
  ];

  for (const key of requiredKeys) {
    if (!isNonEmptyString(result?.[key])) {
      throw createHttpError(500, "Failed to analyse enquiry.");
    }
  }

  if (!ALLOWED_TYPES.has(result.type)) {
    throw createHttpError(500, "Failed to analyse enquiry.");
  }

  if (!ALLOWED_PRIORITIES.has(result.priority)) {
    throw createHttpError(500, "Failed to analyse enquiry.");
  }
}

export async function analyseEnquiry(enquiry) {
  const rawAiResponse = await requestEnquiryAnalysis(enquiry);
  const parsed = parseJsonSafely(rawAiResponse);

  if (!parsed.ok) {
    throw createHttpError(500, "The AI response was not valid JSON.", {
      raw: rawAiResponse,
    });
  }

  validateAiResponseShape(parsed.data);

  return parsed.data;
}
