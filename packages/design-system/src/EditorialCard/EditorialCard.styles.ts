import { makeStyles, mergeClasses } from '@griffel/react';
import { blogTokens } from '@blog/tokens';

const { color, spacing, font } = blogTokens;

/** Editorial card (Loja wireframe `.editorial-art`/`.editorial-body`, `.large-editorial`). */
export const useEditorialCardStyles = makeStyles({
  grid: {
    display: 'block',
  },
  split: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  media: {
    display: 'grid',
    placeItems: 'center',
    aspectRatio: '1.48',
    backgroundColor: color.surfaceMuted,
    color: color.textSecondary,
    textAlign: 'center',
  },
  mediaSplit: {
    aspectRatio: 'auto',
  },
  mediaIndex: {
    display: 'block',
    fontWeight: font.headingLg.weight,
    color: color.textSecondary,
  },
  body: {
    padding: spacing.lg,
  },
  bodySplit: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  eyebrow: {
    display: 'block',
    color: color.primaryBlue,
    fontSize: font.caption.size,
    fontWeight: font.headingMd.weight,
    textTransform: 'uppercase',
  },
  title: {
    marginBlock: spacing.sm,
  },
  description: {
    color: color.textSecondary,
  },
});

export { mergeClasses };
