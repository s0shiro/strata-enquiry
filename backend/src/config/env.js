import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "DO_INFERENCE_API_KEY",
  "DO_INFERENCE_MODEL",
  "DO_INFERENCE_BASE_URL",
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  PORT: Number(process.env.PORT || 5000),
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  DO_INFERENCE_API_KEY: process.env.DO_INFERENCE_API_KEY,
  DO_INFERENCE_MODEL: process.env.DO_INFERENCE_MODEL,
  DO_INFERENCE_BASE_URL: process.env.DO_INFERENCE_BASE_URL,
};
