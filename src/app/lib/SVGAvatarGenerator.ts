import { VIBES } from './vibes';

export class SVGAvatarGenerator {
  private hashInput(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private createSeededRNG(seed: number) {
    let currentSeed = seed;
    return () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
  }

  private getVibeColors(vibe: string): string[] {
    return VIBES[vibe as keyof typeof VIBES] || VIBES.sunset;
  }

  private generatePaletteFromHex(baseHex: string, rng: () => number): string[] {
    // Ensure hex starts with #
    const hex = baseHex.startsWith('#') ? baseHex : `#${baseHex}`;
    
    // Parse RGB values
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Convert to HSL for easier manipulation
    const hsl = this.rgbToHsl(r, g, b);
    const [h, s, l] = hsl;
    
    // Generate 4 related colors with variations
    const colors = [];
    
    // Base color
    colors.push(hex);
    
    // Lighter version
    const lighterL = Math.min(1, l + 0.15 + rng() * 0.1);
    colors.push(this.hslToHex(h, s, lighterL));
    
    // Darker version
    const darkerL = Math.max(0, l - 0.15 - rng() * 0.1);
    colors.push(this.hslToHex(h, s, darkerL));
    
    // Complementary hue variation
    const compH = (h + 0.15 + rng() * 0.3) % 1;
    const compS = Math.max(0.3, s - 0.1 + rng() * 0.2);
    colors.push(this.hslToHex(compH, compS, l));
    
    return colors;
  }
  
  private rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
      
      switch (max) {
        case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
        case g: h = (b - r) / diff + 2; break;
        case b: h = (r - g) / diff + 4; break;
      }
      h /= 6;
    }
    
    return [h, s, l];
  }
  
  private hslToHex(h: number, s: number, l: number): string {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private blendColors(color1: string, color2: string, ratio: number): string {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private generateSmoothGradients(rng: () => number, colors: string[]) {
    // Create 3-4 large, overlapping radial gradients with very soft edges
    const gradients = [];
    const numGradients = 3 + Math.floor(rng() * 2);
    
    for (let i = 0; i < numGradients; i++) {
      // Position gradients to cover the entire area with overlap
      const x = 20 + rng() * 60;
      const y = 20 + rng() * 60;
      const radius = 80 + rng() * 60; // Very large, soft gradients
      
      // Use adjacent colors for smooth blending
      const colorIndex = i % colors.length;
      const nextColorIndex = (i + 1) % colors.length;
      
      const color1 = colors[colorIndex];
      const color2 = colors[nextColorIndex];
      const blendedColor = this.blendColors(color1, color2, 0.5);
      
      gradients.push({
        id: `smooth${i}`,
        cx: x,
        cy: y,
        r: radius,
        color1,
        color2,
        blendedColor,
        opacity: 0.7 + rng() * 0.2
      });
    }
    
    return gradients;
  }

  public generate(input: string, vibe: string = 'sunset', size: number = 256, baseHex?: string, customColors?: string[]): string {
    const seed = this.hashInput(input);
    const rng = this.createSeededRNG(seed);
    
    // Priority: custom colors > hex-based palette > vibe colors
    let colors: string[];
    if (customColors && customColors.length > 0) {
      colors = customColors.map(color => color.startsWith('#') ? color : `#${color}`);
    } else if (baseHex) {
      colors = this.generatePaletteFromHex(baseHex, rng);
    } else {
      colors = this.getVibeColors(vibe);
    }
    
    const gradients = this.generateSmoothGradients(rng, colors);
    
    // Create base gradient
    const baseAngle = rng() * 360;
    const shuffledColors = [...colors].sort(() => rng() - 0.5);
    
    // Create gradient definitions with very soft, smooth transitions
    const gradientDefs = gradients.map(grad => `
      <radialGradient id="${grad.id}" cx="${grad.cx}%" cy="${grad.cy}%" r="${grad.r}%">
        <stop offset="0%" stop-color="${grad.color1}" stop-opacity="${grad.opacity}" />
        <stop offset="30%" stop-color="${grad.blendedColor}" stop-opacity="${grad.opacity * 0.8}" />
        <stop offset="60%" stop-color="${grad.color2}" stop-opacity="${grad.opacity * 0.4}" />
        <stop offset="100%" stop-color="transparent" stop-opacity="0" />
      </radialGradient>
    `).join('');
    
    // Create fills with soft blending
    const gradientFills = gradients.map((grad, index) => {
      const blendMode = index === 0 ? 'normal' : index % 2 === 1 ? 'multiply' : 'overlay';
      return `<rect x="0" y="0" width="${size}" height="${size}" fill="url(#${grad.id})" style="mix-blend-mode: ${blendMode}" />`;
    }).join('');
    
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="base" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${shuffledColors[0]}" stop-opacity="0.8" />
      <stop offset="50%" stop-color="${shuffledColors[1] || shuffledColors[0]}" stop-opacity="0.6" />
      <stop offset="100%" stop-color="${shuffledColors[2] || shuffledColors[0]}" stop-opacity="0.4" />
    </radialGradient>
    ${gradientDefs}
  </defs>
  
  <!-- Base layer -->
  <rect x="0" y="0" width="${size}" height="${size}" fill="url(#base)" />
  
  <!-- Smooth gradient layers -->
  ${gradientFills}
</svg>`;

    return svg;
  }
}
