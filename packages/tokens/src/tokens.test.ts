import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  blogCssText,
  blogCssVariables,
  blogLightTheme,
  blogReducedMotionVariables,
  blogTokens,
  brandRamp,
  colors,
  fluentMapping,
  fluidSize,
  identity,
} from './index';

const repoRoot = join(__dirname, '..', '..', '..');

type AnyToken = {
  name: string;
  kind?: string;
  element?: string;
  status: string;
  source: { file: string; line: number; spec: string };
};
const allTokens = Object.values(identity).flatMap((g) => Object.values(g) as AnyToken[]);

describe('identity provenance', () => {
  it.each(allTokens.map((t) => [t.name, t] as const))('%s cites its source', (_, token) => {
    expect(['resolved', 'conflict', 'gap']).toContain(token.status);
    const text = readFileSync(join(repoRoot, token.source.file), 'utf8');
    if (token.source.line > 0) {
      const line = text.split('\n')[token.source.line - 1] ?? '';
      if (token.kind === 'motion') expect(line).toContain(token.element?.split(' ')[0]);
      else if (token.kind !== 'breakpoint') expect(line).toContain(token.name);
      for (const part of token.source.spec.split(' / ')) expect(line).toContain(part);
    } else {
      expect(text).toContain(token.name);
    }
  });
});

describe('brand ramp (IG3)', () => {
  it('keeps the decided primary as tone 80 (IC1)', () => {
    expect(brandRamp[80]).toBe('#0A63C9');
    expect(colors.primaryBlue.value).toBe('#0A63C9');
  });

  it('has 16 valid tones getting lighter as the tone increases', () => {
    const tones = Object.keys(brandRamp).map(Number);
    expect(tones).toHaveLength(16);
    const lum = (hex: string) => {
      const n = Number.parseInt(hex.slice(1), 16);
      return ((n >> 16) & 255) + ((n >> 8) & 255) + (n & 255);
    };
    for (const tone of tones) expect(brandRamp[tone as 80]).toMatch(/^#[0-9A-F]{6}$/);
    for (let i = 1; i < tones.length; i++) {
      expect(lum(brandRamp[tones[i] as 80])).toBeGreaterThan(lum(brandRamp[tones[i - 1] as 80]));
    }
  });
});

describe('Fluent theme mapping', () => {
  it('applies every mapped identity value to the theme', () => {
    for (const { fluentToken, value } of fluentMapping) {
      expect(blogLightTheme[fluentToken]).toBe(value);
    }
  });

  it('uses the brand ramp for Fluent brand tokens', () => {
    expect(blogLightTheme.colorBrandBackground).toBe('#0A63C9');
  });
});

describe('IC2 ranges', () => {
  it('interpolates between 768px and 1024px', () => {
    expect(fluidSize({ min: 14, max: 16 })).toBe('clamp(14px, 8px + 0.7813vw, 16px)');
    expect(fluidSize({ min: 15, max: 15 })).toBe('15px');
  });

  it('uses the upper bound by default and the lower bound for reduced motion', () => {
    expect(blogCssVariables['--blog-motion-modal-default-app-prompt-duration']).toBe('250ms');
    expect(blogReducedMotionVariables['--blog-motion-modal-default-app-prompt-duration']).toBe(
      '200ms',
    );
    expect(blogCssText).toContain('@media (prefers-reduced-motion: reduce)');
  });
});

describe('CSS variables', () => {
  it('exposes typed references that resolve to declared variables', () => {
    const refs = [
      blogTokens.color.primaryBlue,
      blogTokens.color.surfaceMuted,
      blogTokens.radius.sm,
      blogTokens.spacing.md,
      blogTokens.font.mono.size,
      blogTokens.fontFamily.mono,
    ];
    for (const ref of refs) {
      const name = /^var\((--blog-[a-z0-9-]+)\)$/.exec(ref)?.[1];
      expect(name && blogCssVariables[name]).toBeTruthy();
    }
  });

  it('does not expose conflict/gap or logo-only colours', () => {
    const names = Object.keys(blogCssVariables).join(' ');
    expect(names).not.toContain('success-check');
    expect(names).not.toContain('current-time');
    expect(names).not.toContain('brand-kit');
  });
});
