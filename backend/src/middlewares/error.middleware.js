export function errorMiddleware(error, req, res, next) {
  console.error("[Backend Error]", error);

  const status = error?.status || 500;
  const message = error?.message || "Failed to analyse enquiry.";

  const payload = { message };

  if (typeof error?.raw === "string") {
    payload.raw = error.raw;
  }

  return res.status(status).json(payload);
}
