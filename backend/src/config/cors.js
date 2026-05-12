import { env } from "./env.js";

export const corsOptions = {
  origin: env.FRONTEND_URL,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
