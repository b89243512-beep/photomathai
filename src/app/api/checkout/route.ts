import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createCheckout, LS_VARIANTS, type PlanKey } from "@/lib/lemonsqueezy";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
    }

    const body = await request.json();
    const plan = body?.plan as PlanKey | undefined;
    if (!plan || !LS_VARIANTS[plan]) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "https://photomathai.com";
    const redirectUrl = `${origin}/?upgrade=success`;

    const url = await createCheckout({
      userId: session.user.id,
      email: session.user.email,
      plan,
      redirectUrl,
    });

    if (!url) {
      return NextResponse.json({ error: "Checkout unavailable. Please try again." }, { status: 503 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("checkout error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
