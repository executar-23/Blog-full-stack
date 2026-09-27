import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  blogCssVariables,
  blogReducedMotionVariables,
  brandRamp,
  fluentMapping,
  fluidSize,
  identity,
} from '@blog/tokens';
import { TokenTable, sourceOf, type TokenRow } from './TokenTable';

const meta: Meta = {
  title: 'Foundations/Identity',
  parameters: {
    docs: {
      description: {
        component:
          'Catálogo oficial da identidade visual (fonte: ZIP de Design System). Cada token mostra a especificação literal, o status e a linha de origem. Decisões: docs/GAPS.md e docs/IDENTITY-MAPPING.md.',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

const swatch = (background: string) => (
  <span
    aria-hidden
    style={{
      display: 'inline-block',
      inlineSize: 'var(--blog-spacing-xl)',
      blockSize: 'var(--blog-spacing-lg)',
      background,
      borderRadius: 'var(--blog-radius-sm)',
      outline: '1px solid var(--blog-color-border)',
    }}
  />
);

export const Colors: Story = {
  render: () => (
    <TokenTable
      caption="Cores"
      rows={Object.values(identity.colors).map((t): TokenRow => ({
        name: t.name,
        preview: t.value ? swatch(t.value) : '—',
        value: t.source.spec,
        status: t.status,
        source: sourceOf(t.source),
      }))}
    />
  ),
};

export const Gradients: Story = {
  render: () => (
    <TokenTable
      caption="Gradientes"
      rows={Object.values(identity.gradients).map((t): TokenRow => ({
        name: t.name,
        preview: swatch(`linear-gradient(${t.stops.join(', ')})`),
        value: t.source.spec,
        status: t.status,
        source: sourceOf(t.source),
      }))}
    />
  ),
};

export const Typography: Story = {
  render: () => (
    <TokenTable
      caption="Tipografia (faixas → clamp(), decisão IC2)"
      rows={Object.values(identity.typography).map((t): TokenRow => ({
        name: t.name,
        preview: (
          <span
            style={{
              fontSize: fluidSize(t.size),
              fontWeight: t.weight,
              fontFamily:
                t.family === 'mono'
                  ? 'var(--blog-font-family-mono)'
                  : 'var(--blog-font-family-sans)',
              textTransform: 'textTransform' in t ? t.textTransform : undefined,
            }}
          >
            Risco cognitivo
          </span>
        ),
        value: `${t.source.spec} → ${fluidSize(t.size)}`,
        status: t.status,
        source: sourceOf(t.source),
      }))}
    />
  ),
};

const box = (styles: React.CSSProperties) => (
  <span
    aria-hidden
    style={{
      display: 'inline-block',
      background: 'var(--blog-color-primary-blue)',
      ...styles,
    }}
  />
);

export const Spacing: Story = {
  render: () => (
    <TokenTable
      caption="Espaçamento"
      rows={Object.values(identity.spacing).map((t): TokenRow => ({
        name: t.name,
        preview: box({ inlineSize: `${t.px}px`, blockSize: `${t.px}px` }),
        value: t.source.spec,
        status: t.status,
        source: sourceOf(t.source),
      }))}
    />
  ),
};

export const Radius: Story = {
  render: () => (
    <TokenTable
      caption="Raio"
      rows={Object.values(identity.radii).map((t): TokenRow => ({
        name: t.name,
        preview: box({
          inlineSize: 'var(--blog-spacing-xl)',
          blockSize: 'var(--blog-spacing-xl)',
          borderRadius: `${t.px}px`,
        }),
        value: t.source.spec,
        status: t.status,
        source: sourceOf(t.source),
      }))}
    />
  ),
};

export const Shadows: Story = {
  render: () => (
    <TokenTable
      caption="Sombras"
      rows={Object.values(identity.shadows).map((t): TokenRow => ({
        name: t.name,
        preview: (
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              inlineSize: 'var(--blog-spacing-xl)',
              blockSize: 'var(--blog-spacing-xl)',
              background: 'var(--blog-color-surface)',
              boxShadow: t.value,
            }}
          />
        ),
        value: t.source.spec,
        status: t.status,
        source: sourceOf(t.source),
      }))}
    />
  ),
};

export const Motion: Story = {
  render: () => (
    <TokenTable
      caption="Motion (padrão = limite superior; reduced motion = limite inferior)"
      rows={Object.values(identity.motion).map((t): TokenRow => {
        const key = Object.keys(blogCssVariables).find(
          (name) =>
            name.includes('motion') &&
            name.endsWith('-duration') &&
            blogCssVariables[name] === (t.duration ? `${t.duration.max}ms` : ''),
        );
        return {
          name: `${t.element} — ${t.trigger}`,
          preview: t.animation,
          value: `${t.source.spec}${key && blogReducedMotionVariables[key] ? ` (reduced: ${blogReducedMotionVariables[key]})` : ''}`,
          status: t.status,
          source: sourceOf(t.source),
        };
      })}
    />
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <TokenTable
      caption="Breakpoints"
      rows={Object.values(identity.breakpoints).map((t): TokenRow => ({
        name: t.name,
        value: `${t.minWidth ?? '…'}–${t.maxWidth ?? '…'}px (${t.source.spec})`,
        status: t.status,
        source: sourceOf(t.source),
      }))}
    />
  ),
};

export const BrandRamp: Story = {
  name: 'Brand ramp (derivado — IG3)',
  render: () => (
    <TokenTable
      caption="Ramp de marca derivado de color-primary-blue (tom 80)"
      rows={Object.entries(brandRamp).map(([tone, value]): TokenRow => ({
        name: `brand ${tone}`,
        preview: swatch(value),
        value,
        status: tone === '80' ? 'resolved' : 'derived',
        source: 'packages/tokens/src/ramp.ts',
      }))}
    />
  ),
};

export const FluentMapping: Story = {
  name: 'Mapeamento → Fluent',
  render: () => (
    <TokenTable
      caption="Tokens Fluent sobrescritos pela identidade"
      rows={fluentMapping.map((m): TokenRow => ({
        name: m.fluentToken,
        value: `${m.identityToken} → ${m.value}`,
        status: 'resolved',
        source: m.rationale,
      }))}
    />
  ),
};
