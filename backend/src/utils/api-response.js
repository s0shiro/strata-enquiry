export function createHttpError(status, message, extras = {}) {
  const error = new Error(message);
  error.status = status;

  Object.assign(error, extras);

  return error;
}
