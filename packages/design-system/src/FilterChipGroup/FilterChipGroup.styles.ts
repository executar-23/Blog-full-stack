import { makeStyles } from '@griffel/react';
import { blogTokens } from '@blog/tokens';

const { spacing } = blogTokens;

/** Filter chip row (Loja wireframe `.filters`/`.chip`). */
export const useFilterChipGroupStyles = makeStyles({
  root: {
    display: 'flex',
    columnGap: spacing.sm,
    overflowX: 'auto',
    paddingBottom: spacing.xs,
  },
  chip: {
    flexShrink: 0,
  },
});
