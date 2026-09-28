import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { blogTokens, breakpoints } from '@blog/tokens';

const { spacing, font, fontFamily } = blogTokens;
const mobileMax = `${breakpoints.mobile.maxWidth}px`;

/**
 * Marketing hero (Loja wireframe `.hero`): dark inverted surface. The ZIP has
 * no "dark surface" token (IG2) — uses Fluent's own inverted semantic tokens,
 * the same way IG2 falls back to Fluent where identity is silent.
 */
export const useHeroStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    columnGap: spacing.xl,
    rowGap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
    [`@media (max-width: ${mobileMax})`]: {
      gridTemplateColumns: '1fr',
      padding: spacing.lg,
    },
  },
  eyebrow: {
    display: 'block',
    // `color.primaryBlue` is tuned for light surfaces; on this inverted dark
    // hero it fails contrast. `colorBrandForegroundInverted` (Fluent's own
    // inverted-brand pairing) still falls short at this small size once the
    // theme is generated from our custom brand ramp (4.04:1, measured;
    // AA needs 4.5:1) — so this uses the same safe neutral-inverted
    // foreground as the hero description (IG2: ZIP is silent on dark
    // surfaces), relying on weight/case for emphasis instead of color.
    color: tokens.colorNeutralForegroundInverted2,
    fontFamily: fontFamily.sans,
    fontSize: font.marketingEyebrow.size,
    fontWeight: font.marketingEyebrow.weight,
    textTransform: 'uppercase',
  },
  heading: {
    marginBlock: spacing.sm,
    fontFamily: fontFamily.sans,
    fontSize: font.marketingDisplay.size,
    fontWeight: font.marketingDisplay.weight,
    lineHeight: '1.08',
    maxWidth: '13ch',
  },
  description: {
    color: tokens.colorNeutralForegroundInverted2,
    maxWidth: '46ch',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: spacing.md,
    rowGap: spacing.sm,
    marginTop: spacing.xl,
  },
  identity: {
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: spacing.sm,
    fontWeight: font.headingMd.weight,
  },
  identityIcon: {
    display: 'grid',
    placeItems: 'center',
    width: spacing.xl,
    height: spacing.xl,
    flexShrink: 0,
    borderRadius: blogTokens.radius.md,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeOnBrand2}`,
    backgroundColor: tokens.colorSubtleBackgroundInverted,
    fontWeight: font.headingMd.weight,
  },
  cta: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    borderRadius: blogTokens.radius.lg,
    paddingBlock: spacing.sm,
    paddingInline: spacing.lg,
    backgroundColor: tokens.colorNeutralForegroundInverted,
    color: tokens.colorNeutralBackgroundInverted,
    fontWeight: font.headingMd.weight,
    whiteSpace: 'nowrap',
  },
  media: {
    display: 'grid',
    placeItems: 'center',
    minHeight: `calc(${spacing.xl} * 9)`,
    padding: spacing.lg,
    borderRadius: blogTokens.radius.lg,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeOnBrand2}`,
    backgroundColor: tokens.colorSubtleBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted2,
    textAlign: 'center',
  },
});

export { mergeClasses };
