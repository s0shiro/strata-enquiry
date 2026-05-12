const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function analyseEnquiry(enquiry) {
  const response = await fetch(`${API_URL}/api/analyse-enquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ enquiry }),
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from backend.");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Failed to analyse enquiry.");
  }

  return data;
}
