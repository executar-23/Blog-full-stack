import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { blogTokens, breakpoints } from '@blog/tokens';

const { color, spacing } = blogTokens;
const mobileMax = `${breakpoints.mobile.maxWidth}px`;

/**
 * Section tabs: one Fluent `TabList` reused for both the desktop subnav row
 * and, restyled via media query, the mobile bottom tab bar (wireframe
 * `.subnav`/`.tabbar`) — a single tablist rather than two duplicate ones, to
 * avoid conflicting ARIA landmarks between breakpoints.
 */
export const useSectionTabsStyles = makeStyles({
  root: {
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: color.border,
    [`@media (max-width: ${mobileMax})`]: {
      position: 'fixed',
      insetInline: 0,
      insetBlockEnd: 0,
      zIndex: 10,
      justifyContent: 'space-around',
      borderBottomWidth: 0,
      borderTopWidth: tokens.strokeWidthThin,
      borderTopStyle: 'solid',
      borderTopColor: color.border,
      backgroundColor: color.surface,
      boxShadow: tokens.shadow16,
    },
  },
  icon: {
    fontSize: '1.1em',
  },
  spacer: {
    [`@media (max-width: ${mobileMax})`]: {
      blockSize: spacing.xl,
    },
  },
});
