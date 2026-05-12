export const SYSTEM_PROMPT = `You are an AI assistant for Strata Management Consultants.

Your job is to help staff process incoming client enquiries.

You must classify the enquiry, determine priority, summarize the client concern, recommend the next staff action, and draft a professional suggested response.

Return only valid JSON.
Do not include markdown.
Do not include explanations outside the JSON.`;

export function buildEnquiryPrompt(enquiryText) {
  return `Analyse this client enquiry.

Classify it as one of:
- New Client
- Support Request
- Complaint
- General Question
- Maintenance Request
- Billing/Invoice Question
- Urgent Issue

Priority must be one of:
- Low
- Normal
- High
- Urgent

Priority guide:
Low = general non-urgent enquiry.
Normal = standard enquiry for normal business handling.
High = important or time-sensitive issue requiring faster staff attention.
Urgent = emergency, safety issue, major property damage, or issue needing immediate escalation.

Return this exact JSON structure:

{
  "type": "",
  "priority": "",
  "summary": "",
  "recommended_action": "",
  "suggested_response": ""
}

Client enquiry:
"""
${enquiryText}
"""`;
}
