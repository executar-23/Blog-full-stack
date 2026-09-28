import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { blogTokens } from '@blog/tokens';

const { color, spacing, radius, font } = blogTokens;

/** Product grid card (Loja wireframe `.product-card`). */
export const useProductCardStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: spacing.lg,
  },
  icon: {
    display: 'grid',
    placeItems: 'center',
    width: spacing.xl,
    height: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    border: `${tokens.strokeWidthThin} solid ${color.border}`,
    backgroundColor: color.surfaceMuted,
    color: color.textSecondary,
    fontWeight: font.headingMd.weight,
  },
  title: {
    margin: 0,
  },
  description: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    color: color.textSecondary,
    fontSize: font.caption.size,
  },
  cta: {
    display: 'inline-flex',
    marginTop: 'auto',
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
