import OpenAI from "openai";
import { env } from "../config/env.js";
import { SYSTEM_PROMPT, buildEnquiryPrompt } from "../prompts/enquiry.prompt.js";
import { createHttpError } from "../utils/api-response.js";

const client = new OpenAI({
  apiKey: env.DO_INFERENCE_API_KEY,
  baseURL: env.DO_INFERENCE_BASE_URL,
});

export async function requestEnquiryAnalysis(enquiry) {
  try {
    const completion = await client.chat.completions.create({
      model: env.DO_INFERENCE_MODEL,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: buildEnquiryPrompt(enquiry),
        },
      ],
    });

    const responseText = completion.choices?.[0]?.message?.content?.trim();

    if (!responseText) {
      throw createHttpError(502, "Failed to analyse enquiry.");
    }

    return responseText;
  } catch (error) {
    if (error.status && error.message) {
      throw error;
    }

    throw createHttpError(500, "Failed to analyse enquiry.", {
      cause: error,
    });
  }
}
