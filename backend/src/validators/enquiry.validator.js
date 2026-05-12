import { createHttpError } from "../utils/api-response.js";

export const MAX_ENQUIRY_LENGTH = 5000;

export function validateEnquiryInput(enquiry) {
  if (typeof enquiry !== "string") {
    throw createHttpError(400, "Enquiry text is required.");
  }

  const trimmed = enquiry.trim();

  if (!trimmed) {
    throw createHttpError(400, "Enquiry text is required.");
  }

  if (trimmed.length > MAX_ENQUIRY_LENGTH) {
    throw createHttpError(
      400,
      `Enquiry is too long. Maximum length is ${MAX_ENQUIRY_LENGTH} characters.`
    );
  }

  return trimmed;
}
