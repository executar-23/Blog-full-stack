import type { BrandVariants } from '@fluentui/tokens';

/**
 * Brand ramp derivation (decision IG3, docs/GAPS.md).
 *
 * Fluent UI needs 16 brand tones (10…160). The identity specifies a single
 * primary blue, so the ramp is derived deterministically:
 * - tone 80 is the primary colour, unchanged;
 * - darker tones mix the primary towards black in OKLab (up to 80% at tone 10);
 * - lighter tones mix the primary towards white in OKLab (up to 90% at tone 160).
 * Tones are `derived`, not identity values.
 */
export const RAMP_ANCHOR_TONE = 80;
export const RAMP_MAX_DARKEN = 0.8;
export const RAMP_MAX_LIGHTEN = 0.9;

const TONES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160] as const;

type Rgb = readonly [number, number, number];
type Lab = readonly [number, number, number];

function hexToRgb(hex: string): Rgb {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match?.[1]) throw new Error(`Expected #RRGGBB colour, received "${hex}"`);
  const n = Number.parseInt(match[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: Rgb): string {
  const part = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v)))
      .toString(16)
      .padStart(2, '0');
  return `#${part(r)}${part(g)}${part(b)}`.toUpperCase();
}

const toLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const fromLinear = (v: number) =>
  255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function rgbToOklab([r, g, b]: Rgb): Lab {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToRgb([L, a, b]: Lab): Rgb {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

function mix(from: Lab, to: Lab, amount: number): Lab {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

export function deriveBrandRamp(primaryHex: string): BrandVariants {
  const primary = rgbToOklab(hexToRgb(primaryHex));
  const black = rgbToOklab([0, 0, 0]);
  const white = rgbToOklab([255, 255, 255]);
  const lastTone = TONES[TONES.length - 1] ?? RAMP_ANCHOR_TONE;
  const firstTone = TONES[0] ?? RAMP_ANCHOR_TONE;

  const entries = TONES.map((tone) => {
    if (tone === RAMP_ANCHOR_TONE) return [tone, primaryHex.toUpperCase()] as const;
    const lab =
      tone < RAMP_ANCHOR_TONE
        ? mix(
            primary,
            black,
            ((RAMP_ANCHOR_TONE - tone) / (RAMP_ANCHOR_TONE - firstTone)) * RAMP_MAX_DARKEN,
          )
        : mix(
            primary,
            white,
            ((tone - RAMP_ANCHOR_TONE) / (lastTone - RAMP_ANCHOR_TONE)) * RAMP_MAX_LIGHTEN,
          );
    return [tone, rgbToHex(oklabToRgb(lab))] as const;
  });

  return Object.fromEntries(entries) as BrandVariants;
}
