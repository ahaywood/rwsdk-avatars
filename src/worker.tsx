import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";

import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { SVGAvatarGenerator } from "@/app/lib/SVGAvatarGenerator";

// Helper function to parse avatar parameters from request
function parseAvatarParams(request: Request) {
  const url = new URL(request.url);
  const vibe = url.searchParams.get("vibe") || null; // Don't default to sunset anymore
  const size = parseInt(url.searchParams.get("size") || "256");
  const vibesParam = url.searchParams.get("vibes");

  // Parse custom colors from vibes parameter
  const customColors = vibesParam
    ? vibesParam.split(",").map((c) => c.trim())
    : undefined;

  return { vibe, size, customColors };
}

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [
    route("/", Home),
    route("/:base/:seed", ({ request, params }) => {
      const { base, seed } = params;
      const { vibe, size, customColors } = parseAvatarParams(request);

      const generator = new SVGAvatarGenerator();
      const svg = generator.generate(seed, vibe, size, base, customColors);

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000", // Cache for 1 year
          "Access-Control-Allow-Origin": "*", // No CORS issues!
        },
      });
    }),
    route("/:seed", ({ request, params }) => {
      const input = params.seed;
      const { vibe, size, customColors } = parseAvatarParams(request);

      const generator = new SVGAvatarGenerator();
      const svg = generator.generate(
        input,
        vibe,
        size,
        undefined,
        customColors
      );

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000", // Cache for 1 year
          "Access-Control-Allow-Origin": "*", // No CORS issues!
        },
      });
    }),
  ]),
]);
