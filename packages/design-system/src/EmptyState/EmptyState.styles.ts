import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { blogTokens } from '@blog/tokens';

const { color, spacing, radius, font } = blogTokens;

/** Empty/no-results message (Loja wireframe `.state-card`). */
export const useEmptyStateStyles = makeStyles({
  root: {
    borderRadius: radius.lg,
    border: `${tokens.strokeWidthThin} dashed ${color.border}`,
    padding: spacing.xl,
    textAlign: 'center',
    backgroundColor: color.surfaceMuted,
  },
  title: {
    marginBlock: spacing.sm,
  },
  description: {
    marginInline: 'auto',
    maxWidth: '45ch',
    color: color.textSecondary,
    fontSize: font.body.size,
  },
});
