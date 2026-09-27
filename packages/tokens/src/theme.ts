import { createLightTheme, type Theme } from '@fluentui/tokens';
import { colors, radii, shadows, typography } from './identity';
import { fontFamilies } from './foundations';
import { deriveBrandRamp } from './ramp';
import { fluidSize } from './responsive';

export const brandRamp = deriveBrandRamp(colors.primaryBlue.value);

export interface FluentMapping {
  fluentToken: keyof Theme;
  identityToken: string;
  value: string;
  rationale: string;
}

/**
 * Identity token → Fluent token, by semantic role (ADR-001 addendum).
 * Only these Fluent tokens are overridden; every other Fluent token keeps the
 * value produced by `createLightTheme(brandRamp)` (the identity is silent on them — IG2).
 */
export const fluentMapping: readonly FluentMapping[] = [
  {
    fluentToken: 'colorNeutralForeground1',
    identityToken: colors.textPrimary.name,
    value: colors.textPrimary.value,
    rationale: 'Primary text (headings, primary copy)',
  },
  {
    fluentToken: 'colorNeutralForeground3',
    identityToken: colors.textSecondary.name,
    value: colors.textSecondary.value,
    rationale: 'Secondary/meta text (timestamps, helper text)',
  },
  {
    fluentToken: 'colorNeutralBackground1',
    identityToken: colors.surface.name,
    value: colors.surface.value,
    rationale: 'Default surface (cards, modals, list rows)',
  },
  {
    fluentToken: 'colorNeutralBackground3',
    identityToken: colors.surfaceMuted.name,
    value: colors.surfaceMuted.value,
    rationale: 'Muted surface',
  },
  {
    fluentToken: 'colorNeutralStroke2',
    identityToken: colors.border.name,
    value: colors.border.value,
    rationale: 'Card outlines and dividers',
  },
  {
    fluentToken: 'colorBackgroundOverlay',
    identityToken: colors.overlayScrim.name,
    value: colors.overlayScrim.value,
    rationale: 'Dialog backdrop',
  },
  {
    fluentToken: 'colorBrandForegroundLink',
    identityToken: colors.primaryBlue.name,
    value: colors.primaryBlue.value,
    rationale: 'Links use the primary blue',
  },
  {
    fluentToken: 'colorStrokeFocus2',
    identityToken: colors.primaryBlue.name,
    value: colors.primaryBlue.value,
    rationale: 'Focus ring uses the primary blue',
  },
  {
    fluentToken: 'borderRadiusMedium',
    identityToken: radii.md.name,
    value: `${radii.md.px}px`,
    rationale: 'Fluent Button, Menu, Popover and Dropdown use borderRadiusMedium',
  },
  {
    fluentToken: 'borderRadiusXLarge',
    identityToken: radii.lg.name,
    value: `${radii.lg.px}px`,
    rationale: 'Fluent Dialog surface uses borderRadiusXLarge',
  },
  {
    fluentToken: 'fontFamilyBase',
    identityToken: typography.headingLg.name,
    value: fontFamilies.sans,
    rationale: '"system sans" (IG1)',
  },
  {
    fluentToken: 'fontFamilyMonospace',
    identityToken: typography.mono.name,
    value: fontFamilies.mono,
    rationale: '"monospace" (IG1)',
  },
  {
    fluentToken: 'fontSizeBase200',
    identityToken: typography.caption.name,
    value: fluidSize(typography.caption.size),
    rationale: 'Fluent Caption1 size',
  },
  {
    fluentToken: 'fontSizeBase300',
    identityToken: typography.body.name,
    value: fluidSize(typography.body.size),
    rationale: 'Fluent Body1 size',
  },
  {
    fluentToken: 'fontSizeBase500',
    identityToken: typography.headingMd.name,
    value: fluidSize(typography.headingMd.size),
    rationale: 'Fluent Subtitle1 size (panel/card titles)',
  },
  {
    fluentToken: 'fontSizeHero700',
    identityToken: typography.headingLg.name,
    value: fluidSize(typography.headingLg.size),
    rationale: 'Fluent Title2 size (modal titles)',
  },
  {
    fluentToken: 'shadow16',
    identityToken: shadows.modal.name,
    value: shadows.modal.value,
    rationale: 'Fluent Popover/Menu/Tooltip elevation',
  },
  {
    fluentToken: 'shadow64',
    identityToken: shadows.modal.name,
    value: shadows.modal.value,
    rationale: 'Fluent Dialog elevation',
  },
];

const overrides = Object.fromEntries(
  fluentMapping.map(({ fluentToken, value }) => [fluentToken, value]),
) as Partial<Theme>;

/** Light theme (the identity defines no dark theme — IG2). */
export const blogLightTheme: Theme = { ...createLightTheme(brandRamp), ...overrides };
