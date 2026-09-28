import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { blogTokens } from '@blog/tokens';

const { color, radius, spacing } = blogTokens;

/**
 * Clickable card shell (Loja wireframe `.card-link`: hero, editorial cards,
 * collection tiles and product cards all share this hover/border/radius
 * treatment). Hover elevation duration/easing is not specified by the ZIP
 * (IG2) — uses Fluent's own motion tokens.
 */
export const useCardLinkStyles = makeStyles({
  root: {
    display: 'block',
    minWidth: 0,
    overflow: 'hidden',
    textDecorationLine: 'none',
    color: 'inherit',
    borderRadius: radius.lg,
    border: `${tokens.strokeWidthThin} solid ${color.border}`,
    backgroundColor: color.surface,
    transitionProperty: 'transform, box-shadow, border-color',
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ':hover': {
      transform: `translateY(calc(${spacing.xs} * -1))`,
      boxShadow: tokens.shadow16,
    },
    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: tokens.strokeWidthThick,
      outlineColor: color.primaryBlue,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
  },
});

export { mergeClasses };
