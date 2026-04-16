import { NextRequest, NextResponse } from "next/server";
import { verifySignature, LS_VARIANTS } from "@/lib/lemonsqueezy";
import { supabaseAdmin } from "@/lib/supabase";

interface SubscriptionAttrs {
  status?: string;
  variant_id?: number;
  customer_id?: number;
  renews_at?: string | null;
  ends_at?: string | null;
  user_email?: string;
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    const signature = request.headers.get("x-signature");

    const ok = await verifySignature(raw, signature);
    if (!ok) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(raw);
    const eventName = payload?.meta?.event_name as string | undefined;
    const customData = payload?.meta?.custom_data || {};
    const userId = customData.user_id as string | undefined;
    const data = payload?.data;
    const subId = data?.id as string | undefined;
    const attrs = (data?.attributes || {}) as SubscriptionAttrs;

    // Log event for audit
    await supabaseAdmin.from("subscription_events").insert({
      user_id: userId || null,
      event_name: eventName || "unknown",
      subscription_id: subId || null,
      payload: payload,
    });

    // Find user by custom_data.user_id first, otherwise by email
    let targetUserId = userId;
    if (!targetUserId && attrs.user_email) {
      const { data: u } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", attrs.user_email)
        .single();
      if (u) targetUserId = u.id;
    }

    if (!targetUserId) {
      console.warn("Webhook: could not resolve user", eventName, subId);
      return NextResponse.json({ ok: true });
    }

    // Determine plan label from variant_id
    const variantId = String(attrs.variant_id ?? "");
    let variantLabel: string | null = null;
    if (variantId === LS_VARIANTS.weekly) variantLabel = "weekly";
    else if (variantId === LS_VARIANTS.yearly) variantLabel = "yearly";

    const status = attrs.status || "";
    // Active states that grant pro access
    const isActive = ["active", "on_trial"].includes(status);
    const newPlan = isActive ? "pro" : "free";

    await supabaseAdmin
      .from("users")
      .update({
        plan: newPlan,
        subscription_id: subId || null,
        subscription_status: status || null,
        subscription_variant: variantLabel,
        subscription_renews_at: attrs.renews_at || null,
        subscription_ends_at: attrs.ends_at || null,
        customer_id: attrs.customer_id ? String(attrs.customer_id) : null,
      })
      .eq("id", targetUserId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

// Lemon Squeezy webhooks don't need GET, but return something helpful
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
