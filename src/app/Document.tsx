import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>RWSDK Avatars</title>

      {/* TODO: Add a Favicon */}

      {/* TODO: Add Open Graph Tags */}

      {/* TODO: Add Meta Description */}

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
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
