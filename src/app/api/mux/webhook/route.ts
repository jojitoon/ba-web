"use node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import crypto from "crypto";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);

    const signature = headers["mux-signature"];
    const secret = process.env.MUX_WEBHOOK_SECRET;

    if (!secret) {
      console.error("MUX_WEBHOOK_SECRET not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    if (!verifyMuxSignature(payload, signature as string, secret)) {
      console.warn("Invalid webhook signature");
      return new Response("Unauthorized", { status: 401 });
    }

    const event = JSON.parse(payload);

    await convex.mutation(api.media.muxWebhook, {
      payload: event,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

function verifyMuxSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  if (!signature) return false;

  const parts = signature.split(",");
  let timestamp = "";
  let hash = "";

  for (const part of parts) {
    if (part.startsWith("t=")) {
      timestamp = part.slice(2);
    } else if (part.startsWith("v1=")) {
      hash = part.slice(3);
    }
  }

  if (!timestamp || !hash) return false;

  const messageTime = parseInt(timestamp, 10);
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - messageTime > 300) {
    console.warn("Webhook timestamp too old");
    return false;
  }

  const signedContent = `${timestamp}.${body}`;
  const expectedHash = crypto
    .createHmac("sha256", secret)
    .update(signedContent)
    .digest("hex");

  return hash === expectedHash;
}
