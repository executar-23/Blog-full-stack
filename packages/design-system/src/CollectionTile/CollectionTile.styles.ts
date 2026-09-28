import { makeStyles, mergeClasses } from '@griffel/react';
import { blogTokens } from '@blog/tokens';

const { color, spacing, font } = blogTokens;

/** Collection shelf tile (Loja wireframe `.collection`). */
export const useCollectionTileStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: color.surfaceMuted,
  },
  muted: {
    backgroundColor: color.surfaceMuted,
  },
  subtle: {
    backgroundColor: color.surface,
  },
  eyebrow: {
    display: 'block',
    color: color.primaryBlue,
    fontSize: font.caption.size,
    fontWeight: font.headingMd.weight,
    textTransform: 'uppercase',
  },
  title: {
    maxWidth: '15ch',
    margin: 0,
  },
  meta: {
    color: color.textSecondary,
    fontSize: font.caption.size,
  },
});

export { mergeClasses };
