import Mux from "@mux/mux-node";

export async function POST() {
  try {
    if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
      console.error("Missing MUX credentials");
      return new Response(
        JSON.stringify({ error: "Missing MUX credentials" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    });

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policy: ["public"],
      },
      cors_origin: "*",
    });

    return new Response(
      JSON.stringify({
        url: upload.url,
        uploadId: upload.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to create upload URL" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
