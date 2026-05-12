import { useMemo, useState } from "react";
import { analyseEnquiry } from "../features/enquiry/api";
import { MAX_ENQUIRY_LENGTH } from "../features/enquiry/constants";

function validateEnquiry(enquiry) {
  const trimmed = enquiry.trim();

  if (!trimmed) {
    return "Enquiry text is required.";
  }

  if (trimmed.length > MAX_ENQUIRY_LENGTH) {
    return `Enquiry is too long. Maximum length is ${MAX_ENQUIRY_LENGTH} characters.`;
  }

  return null;
}

export function useAnalyseEnquiry() {
  const [enquiry, setEnquiry] = useState("");
  const [lastSubmittedEnquiry, setLastSubmittedEnquiry] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const remainingCharacters = useMemo(
    () => MAX_ENQUIRY_LENGTH - enquiry.length,
    [enquiry]
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateEnquiry(enquiry);
    if (validationError) {
      setError(validationError);
      return;
    }

    const enquiryToSubmit = enquiry.trim();

    setIsLoading(true);
    setError("");
    setLastSubmittedEnquiry(enquiryToSubmit);
    setEnquiry("");

    try {
      const nextResult = await analyseEnquiry(enquiryToSubmit);
      setResult(nextResult);
    } catch (submitError) {
      setError(submitError.message || "Failed to analyse enquiry.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    enquiry,
    setEnquiry,
    lastSubmittedEnquiry,
    result,
    isLoading,
    error,
    remainingCharacters,
    handleSubmit,
  };
}
