import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>RWSDK Avatars</title>

      <link rel="icon" href="/favicon.png" type="image/png" />

      {/* TODO: Add Open Graph Tags */}

      <meta
        name="description"
        content="Generate beautiful, deterministic gradient mesh avatars with customizable color palettes. Free API with 29+ vibes, custom hex colors, and SVG output. Perfect for user profiles and branding."
      />

      <link rel="stylesheet" href={styles} />

      {/* GOOGLE FONTS */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="modulepreload" href="/src/client.tsx" />

      {/* FATHOM ANALYTICS */}
      <script
        src="https://cdn.usefathom.com/script.js"
        data-site="DPWFPXGI"
        defer
      ></script>
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
