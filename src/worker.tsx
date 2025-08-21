import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";

import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { SVGAvatarGenerator } from "@/app/lib/SVGAvatarGenerator";

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
      
      // Check if base looks like a hex color (6 characters, all hex digits)
      const hexPattern = /^[0-9A-Fa-f]{6}$/;
      if (hexPattern.test(base)) {
        const url = new URL(request.url);
        const vibe = url.searchParams.get("vibe") || "sunset";
        const size = parseInt(url.searchParams.get("size") || "256");

        const generator = new SVGAvatarGenerator();
        const svg = generator.generate(seed, vibe, size, base);

        return new Response(svg, {
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=31536000", // Cache for 1 year
            "Access-Control-Allow-Origin": "*", // No CORS issues!
          },
        });
      }
      
      // If not a hex color, show debug info
      return (
        <div>
          <h1>Base: {base}</h1>
          <h1>Seed: {seed}</h1>
          <p>Base should be a 6-character hex color (e.g., FF0000)</p>
        </div>
      );
    }),
    route("/:seed", ({ request, params }) => {
      const input = params.seed;
      const url = new URL(request.url);
      const vibe = url.searchParams.get("vibe") || "sunset";
      const size = parseInt(url.searchParams.get("size") || "256");

      const generator = new SVGAvatarGenerator();
      const svg = generator.generate(input, vibe, size);

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
