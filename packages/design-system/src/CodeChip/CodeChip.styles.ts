import { makeStyles, mergeClasses } from '@griffel/react';
import { blogTokens } from '@blog/tokens';

const { color, radius, spacing, font, fontFamily, motion } = blogTokens;

export const useCodeChipStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: spacing.sm,
  },
  code: {
    backgroundColor: color.surfaceMuted,
    color: color.textPrimary,
    borderRadius: radius.sm,
    paddingBlock: spacing.xs,
    paddingInline: spacing.sm,
    fontFamily: fontFamily.mono,
    fontSize: font.mono.size,
    fontWeight: font.mono.weight,
    userSelect: 'all',
  },
  expired: {
    color: color.textSecondary,
    textDecorationLine: 'line-through',
  },
  status: {
    color: color.textSecondary,
    fontSize: font.caption.size,
    fontWeight: font.caption.weight,
    transitionProperty: 'opacity',
    transitionDuration: motion.codeChip.duration,
    transitionTimingFunction: motion.codeChip.easing,
    opacity: 0,
  },
  statusVisible: {
    opacity: 1,
  },
});

export { mergeClasses };
