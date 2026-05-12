export function parseJsonSafely(rawValue) {
  try {
    return {
      ok: true,
      data: JSON.parse(rawValue),
    };
  } catch {
    return {
      ok: false,
      data: null,
    };
  }
}
