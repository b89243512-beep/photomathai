const LS_API = "https://api.lemonsqueezy.com/v1";

export const LS_VARIANTS = {
  weekly: process.env.LEMONSQUEEZY_WEEKLY_VARIANT_ID!,
  yearly: process.env.LEMONSQUEEZY_YEARLY_VARIANT_ID!,
} as const;

export type PlanKey = keyof typeof LS_VARIANTS;

/**
 * Create a checkout URL with user email pre-filled and user id in custom data.
 * The webhook will use `custom_data.user_id` to link the subscription to our Supabase user.
 */
export async function createCheckout(params: {
  userId: string;
  email: string;
  plan: PlanKey;
  redirectUrl: string;
}): Promise<string | null> {
  const variantId = LS_VARIANTS[params.plan];
  const storeId = process.env.LEMONSQUEEZY_STORE_ID!;
  const apiKey = process.env.LEMONSQUEEZY_API_KEY!;

  const res = await fetch(`${LS_API}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: params.email,
            custom: { user_id: params.userId },
          },
          product_options: {
            redirect_url: params.redirectUrl,
            receipt_button_text: "Start Solving",
            receipt_thank_you_note: "Thanks for upgrading! You now have unlimited access.",
          },
        },
        relationships: {
          store: { data: { type: "stores", id: storeId } },
          variant: { data: { type: "variants", id: variantId } },
        },
      },
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("LS checkout error:", res.status, txt);
    return null;
  }

  const json = await res.json();
  return json?.data?.attributes?.url || null;
}

/** Verify webhook signature using HMAC SHA-256 */
export async function verifySignature(body: string, signature: string | null): Promise<boolean> {
  if (!signature) return false;
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const expected = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // Constant-time compare
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return diff === 0;
}
