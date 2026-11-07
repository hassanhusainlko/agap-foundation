const ENDPOINT = import.meta.env.VITE_INQUIRY_ENDPOINT;

/**
 * Sends the contact form. Set VITE_INQUIRY_ENDPOINT in .env to POST JSON to your backend
 * (or a form service). Without it, this runs in demo mode and does not send anything.
 */
export async function submitInquiry(payload) {
  if (!ENDPOINT) {
    console.warn('[AGAP] VITE_INQUIRY_ENDPOINT is not set. Inquiry was NOT sent.', payload);
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true, demo: true };
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return { ok: true };
}
