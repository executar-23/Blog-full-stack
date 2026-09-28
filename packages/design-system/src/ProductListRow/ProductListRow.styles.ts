import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { blogTokens } from '@blog/tokens';

const { color, spacing, radius, font } = blogTokens;

/** Product list (Loja wireframe `.product-list`/`.product-row`). */
export const useProductListStyles = makeStyles({
  root: {
    borderRadius: radius.lg,
    border: `${tokens.strokeWidthThin} solid ${color.border}`,
    overflow: 'hidden',
  },
});

export const useProductListRowStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    columnGap: spacing.md,
    padding: spacing.md,
    textDecorationLine: 'none',
    color: 'inherit',
    borderTopWidth: tokens.strokeWidthThin,
    borderTopStyle: 'solid',
    borderTopColor: color.border,
    transitionProperty: 'background-color',
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ':first-child': {
      borderTopWidth: 0,
    },
    ':hover': {
      backgroundColor: color.surfaceMuted,
    },
    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: tokens.strokeWidthThick,
      outlineColor: color.primaryBlue,
      outlineOffset: `calc(${tokens.spacingHorizontalXXS} * -1)`,
    },
  },
  icon: {
    display: 'grid',
    placeItems: 'center',
    width: spacing.xl,
    height: spacing.xl,
    flexShrink: 0,
    borderRadius: radius.md,
    border: `${tokens.strokeWidthThin} solid ${color.border}`,
    backgroundColor: color.surfaceMuted,
    color: color.textSecondary,
    fontWeight: font.headingMd.weight,
  },
  copy: {
    minWidth: 0,
    flex: 1,
  },
  title: {
    margin: 0,
  },
  description: {
    marginTop: spacing.xs,
    marginBottom: 0,
    color: color.textSecondary,
    fontSize: font.caption.size,
  },
  cta: {
    display: 'inline-flex',
    marginLeft: 'auto',
    flexShrink: 0,
    borderRadius: radius.lg,
    paddingBlock: spacing.xs,
    paddingInline: spacing.md,
    backgroundColor: color.surfaceMuted,
    color: color.primaryBlue,
    fontWeight: font.headingMd.weight,
    fontSize: font.caption.size,
  },
});

export { mergeClasses };
