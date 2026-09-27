import { breakpoints, colors, gradients, motion, radii, spacing, typography } from './identity';
import { fontFamilies } from './foundations';
import { fluidSize, motionDurations } from './responsive';

/**
 * Identity tokens exposed as CSS custom properties (`--blog-<group>-<token>`).
 * Components reference them through the typed `blogTokens` object
 * (`var(--blog-…)`), never through raw values (ADR-001 addendum §4).
 *
 * Excluded on purpose: tokens with status `conflict`/`gap` and brand-kit
 * colours, which belong to the logo assets only (IC0/IC3/IC4).
 */
const PREFIX = '--blog-';

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

type ExcludedColor =
  | 'successCheck'
  | 'currentTimeIndicator'
  | 'brandKitBlue'
  | 'brandKitBoardFill'
  | 'brandKitBoardLine';
type UiColorKey = Exclude<keyof typeof colors, ExcludedColor>;

const uiColors = Object.fromEntries(
  Object.entries(colors).filter(([, t]) => t.status === 'resolved' && !t.name.includes('_')),
) as Pick<typeof colors, UiColorKey>;

interface Variable {
  name: string;
  standard: string;
  reduced?: string;
}

function group<T extends object>(
  groupName: string,
  source: T,
  values: (token: T[keyof T]) => Record<string, string | { standard: string; reduced: string }>,
) {
  const variables: Variable[] = [];
  const refs = {} as Record<keyof T, Record<string, string>>;
  for (const [key, token] of Object.entries(source) as [keyof T & string, T[keyof T]][]) {
    const tokenRefs: Record<string, string> = {};
    refs[key] = tokenRefs;
    for (const [suffix, value] of Object.entries(values(token))) {
      const name = `${PREFIX}${groupName}-${kebab(key)}${suffix ? `-${suffix}` : ''}`;
      tokenRefs[suffix || 'value'] = `var(${name})`;
      variables.push(
        typeof value === 'string'
          ? { name, standard: value }
          : { name, standard: value.standard, reduced: value.reduced },
      );
    }
  }
  return { variables, refs };
}

const colorGroup = group('color', uiColors, (t) => ({ '': t.value }));
const gradientGroup = group('gradient', gradients, (t) => ({
  '': `linear-gradient(${t.stops.join(', ')})`,
}));
const radiusGroup = group('radius', radii, (t) => ({ '': `${t.px}px` }));
const spacingGroup = group('spacing', spacing, (t) => ({ '': `${t.px}px` }));
const typographyGroup = group('font', typography, (t) => ({
  size: fluidSize(t.size),
  weight: String(t.weight),
}));
const familyGroup = group('font-family', fontFamilies, (t) => ({ '': t }));
const motionGroup = group('motion', motion, (t) => ({
  ...(t.duration ? { duration: motionDurations(t.duration) } : {}),
  easing: t.easing === 'spring/ease-out' ? 'ease-out' : t.easing,
}));
const breakpointGroup = group('breakpoint', breakpoints, (t) => ({
  ...(t.minWidth === null ? {} : { min: `${t.minWidth}px` }),
  ...(t.maxWidth === null ? {} : { max: `${t.maxWidth}px` }),
}));

const allVariables = [
  colorGroup,
  gradientGroup,
  radiusGroup,
  spacingGroup,
  typographyGroup,
  familyGroup,
  motionGroup,
  breakpointGroup,
].flatMap((g) => g.variables);

type Simple<T> = { readonly [K in keyof T]: string };
const simple = <T>(refs: Record<keyof T, Record<string, string>>) =>
  Object.fromEntries(
    Object.entries(refs).map(([k, v]) => [k, (v as Record<string, string>)['value']]),
  ) as Simple<T>;

/** Typed `var(--blog-…)` references for Griffel styles. */
export const blogTokens = {
  color: simple<typeof uiColors>(colorGroup.refs),
  gradient: simple<typeof gradients>(gradientGroup.refs),
  radius: simple<typeof radii>(radiusGroup.refs),
  spacing: simple<typeof spacing>(spacingGroup.refs),
  fontFamily: simple<typeof fontFamilies>(familyGroup.refs),
  font: typographyGroup.refs as {
    readonly [K in keyof typeof typography]: { readonly size: string; readonly weight: string };
  },
  motion: motionGroup.refs as {
    readonly [K in keyof typeof motion]: { readonly duration?: string; readonly easing: string };
  },
  breakpoint: breakpointGroup.refs as {
    readonly [K in keyof typeof breakpoints]: { readonly min?: string; readonly max?: string };
  },
} as const;

/** CSS custom properties (name → value) for the default context. */
export const blogCssVariables: Readonly<Record<string, string>> = Object.fromEntries(
  allVariables.map((v) => [v.name, v.standard]),
);

/** Overrides applied under `prefers-reduced-motion: reduce` (IC2). */
export const blogReducedMotionVariables: Readonly<Record<string, string>> = Object.fromEntries(
  allVariables
    .filter((v) => v.reduced !== undefined && v.reduced !== v.standard)
    .map((v) => [v.name, v.reduced as string]),
);

const declarations = (vars: Readonly<Record<string, string>>) =>
  Object.entries(vars)
    .map(([name, value]) => `${name}:${value};`)
    .join('');

/** Stylesheet text declaring every `--blog-*` variable on `:root`. */
export const blogCssText =
  `:root{${declarations(blogCssVariables)}}` +
  `@media (prefers-reduced-motion: reduce){:root{${declarations(blogReducedMotionVariables)}}}`;
