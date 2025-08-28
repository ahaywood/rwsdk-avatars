# Gradient Avatar Generator API

A JavaScript-based gradient mesh avatar generator similar to Laravel's avatars.laravel.cloud service. Generate beautiful, deterministic SVG avatars with customizable color palettes and smooth gradient blending.

## Features

- 🎨 **29 Predefined Vibes** - Bold, medium, and soft color palettes
- 🎯 **Deterministic Generation** - Same input always produces the same avatar
- 🌈 **Custom Color Palettes** - Three ways to customize colors
- 📐 **Scalable SVG Output** - Perfect quality at any size
- 🚀 **Fast API** - Built with RedwoodSDK and Cloudflare Workers
- 🌐 **CORS Friendly** - No cross-origin issues

## Quick Start

```shell
npm install
npm run dev
```

Point your browser to `http://localhost:5173/` to see the demo page with examples.

## API Usage

### Basic Avatar Generation

```
GET /[input]?vibe=[vibe]&size=[size]
```

**Examples:**
- `/user123` - Default sunset vibe, 256px
- `/user123?vibe=ocean&size=128` - Ocean vibe, 128px
- `/john.doe@example.com?vibe=forest` - Email as input

### Custom Color Palette (Hex Base)

```
GET /[hex]/[input]?size=[size]
```

Generate a palette based on your brand color:

**Examples:**
- `/FF0000/user123` - Red-based palette
- `/0066CC/user123?size=72` - Blue-based palette
- `/00AA44/company-logo` - Green-based palette

### Bring Your Own Colors

```
GET /[input]?vibes=[color1,color2,color3,color4]&size=[size]
```

Specify exact colors for complete control:

**Examples:**
- `/user123?vibes=a29bfe,74b9ff,0984e3,6c5ce7` - Custom blue palette
- `/user123?vibes=FF6B6B,FF8E53,FF6B9D,C44569&size=128` - Custom warm palette

## Available Vibes

### Bold & Vibrant
`sunset`, `ocean`, `daybreak`, `bubble`, `forest`, `fire`, `crystal`, `ice`, `stealth`

### Medium & Balanced
`autumn`, `coral`, `teal`, `plum`, `olive`, `slate`, `amber`, `indigo`, `terracotta`, `seafoam`

### Soft & Muted
`pastel`, `cream`, `sage`, `lavender`, `mint`, `peach`, `sky`, `rose`, `sand`, `mist`

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | - | Seed for avatar generation (username, email, UUID, etc.) |
| `vibe` | string | *random* | Predefined color palette name (deterministically selected if not provided) |
| `size` | number | `256` | Avatar size in pixels |
| `vibes` | string | - | Comma-separated hex colors (with or without #) |
| `hex` | string | - | Base hex color for palette generation (6 characters, no #) |

## Response Format

- **Content-Type:** `image/svg+xml`
- **Cache-Control:** `public, max-age=31536000` (1 year)
- **CORS:** Enabled with `Access-Control-Allow-Origin: *`

## Color Customization Priority

1. **Custom Colors** (`vibes` parameter) - Highest priority
2. **Hex-Based Palette** (`/hex/input` format) - Medium priority
3. **Predefined Vibes** (`vibe` parameter) - If specified
4. **Random Vibe Selection** - Deterministic fallback based on input

## Deterministic Random Vibe Selection

When no vibe, custom colors, or base hex color is provided, the system automatically selects a vibe from the 29 available options. The selection is:
- **Deterministic**: Same input always gets the same vibe
- **Evenly distributed**: Uses input hash to ensure good distribution across all vibes
- **Consistent**: `user123` will always get the same random vibe across requests

## Usage Examples

### HTML
```html
<img src="/user123?vibe=ocean&size=64"
     alt="User Avatar"
     style="border-radius: 50%;" />
```

### CSS Background
```css
.avatar {
  background-image: url('/user123?vibe=forest&size=128');
  background-size: cover;
  border-radius: 50%;
  width: 64px;
  height: 64px;
}
```

### React Component
```jsx
function Avatar({ userId, vibe = 'sunset', size = 64 }) {
  return (
    <img
      src={`/${userId}?vibe=${vibe}&size=${size}`}
      alt="Avatar"
      style={{
        width: size,
        height: size,
        borderRadius: '50%'
      }}
    />
  );
}
```

### Brand Colors
```jsx
// Use your brand's primary color
<img src="/user123?vibes=1e40af,3b82f6,60a5fa,93c5fd&size=128" />

// Or generate from a base hex
<img src="/1e40af/user123?size=128" />
```

## Technical Details

- **Framework:** RedwoodSDK with Cloudflare Workers
- **Output:** Square SVG with CSS circular masking
- **Algorithm:** Multi-radial gradients with seeded randomness
- **Deterministic:** Same input + parameters = identical avatar
- **Performance:** Cached responses, optimized generation

## Development

```shell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

## Project Structure

```
src/
├── app/
│   ├── lib/
│   │   ├── SVGAvatarGenerator.ts  # Core avatar generation logic
│   │   └── vibes.ts               # Predefined color palettes
│   └── pages/
│       └── Home.tsx               # Demo page with examples
└── worker.tsx                     # API routes and request handling
```

## License

MIT License - Feel free to use in your projects!

## Inspiration

Inspired by Laravel's [avatars.laravel.cloud](https://avatars.laravel.cloud) service, built with modern JavaScript and enhanced customization options.
