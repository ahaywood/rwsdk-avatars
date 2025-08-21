import { RequestInfo } from "rwsdk/worker";

const DEMO_INPUTS = [
  "taylor@laravel.com",
  "cfb7e828-a90f-4ed1-a818-a20241ac4e73",
  "bfca8292-3dea-4458-9af5-49bd0fdb4426",
  "user123",
  "demo@example.com",
];

const VIBES = [
  // Bold & Vibrant
  "sunset",
  "ocean",
  "daybreak",
  "bubble",
  "forest",
  "fire",
  "crystal",
  "ice",
  "stealth",

  // Medium & Balanced
  "autumn",
  "coral",
  "teal",
  "plum",
  "olive",
  "slate",
  "amber",
  "indigo",
  "terracotta",
  "seafoam",

  // Soft & Muted
  "pastel",
  "cream",
  "sage",
  "lavender",
  "peach",
  "mint",
  "rose",
  "sky",
  "sand",
  "mist",
];

export function Home({ ctx }: RequestInfo) {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Gradient Avatar Generator</h1>
      <p>
        Generate beautiful gradient mesh avatars similar to Laravel's avatar
        service.
      </p>

      <h2>API Usage</h2>
      <code
        style={{
          background: "#f5f5f5",
          padding: "0.5rem",
          borderRadius: "4px",
          display: "block",
          margin: "1rem 0",
        }}
      >
        /avatar/[input]?vibe=[vibe]&size=[size]
      </code>

      <h2>Demo Avatars</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {DEMO_INPUTS.map((input) => (
          <div key={input} style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
              {input}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.5rem",
              }}
            >
              {VIBES.map((vibe) => (
                <div key={vibe} style={{ textAlign: "center" }}>
                  <img
                    src={`/avatar/${encodeURIComponent(
                      input
                    )}?vibe=${vibe}&size=64`}
                    alt={`${input} - ${vibe}`}
                    style={{
                      width: "64px",
                      height: "64px",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "0.7rem",
                      marginTop: "0.25rem",
                      color: "#666",
                    }}
                  >
                    {vibe}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Available Vibes</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {VIBES.map((vibe) => (
          <span
            key={vibe}
            style={{
              background: "#e5e7eb",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.8rem",
            }}
          >
            {vibe}
          </span>
        ))}
      </div>

      <h2>Examples</h2>
      <ul style={{ marginTop: "1rem" }}>
        <li>
          <a href="/avatar/taylor@laravel.com">/avatar/taylor@laravel.com</a>
        </li>
        <li>
          <a href="/avatar/taylor@laravel.com?vibe=ocean">
            /avatar/taylor@laravel.com?vibe=ocean
          </a>
        </li>
        <li>
          <a href="/avatar/user123?vibe=sunset&size=128">
            /avatar/user123?vibe=sunset&size=128
          </a>
        </li>
      </ul>
    </div>
  );
}
