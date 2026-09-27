/**
 * Visual identity — values extracted verbatim from the canonical sources.
 *
 * - HANDOFF: docs/sources/design-system-zip/handoff-spec-onboarding-patterns.md (canonical identity, ADR-001)
 * - BRAND_KIT: docs/sources/brand-kit/brand/palette.json (logo assets only — decision IC0)
 *
 * Every token records its source line and status. Nothing here is invented:
 * - `resolved`  → value taken literally from the source (or fixed by an explicit user decision);
 * - `conflict`  → sources disagree; see docs/GAPS.md (not consumed by the theme);
 * - `gap`       → the source names the token but gives no usable value.
 */

export const HANDOFF = 'docs/sources/design-system-zip/handoff-spec-onboarding-patterns.md';
export const BRAND_KIT = 'docs/sources/brand-kit/brand/palette.json';

export type TokenStatus = 'resolved' | 'conflict' | 'gap';

export interface TokenSource {
  file: string;
  line: number;
  /** Literal text of the specification cell. */
  spec: string;
}

export interface Range {
  min: number;
  max: number;
}

interface BaseToken {
  /** Token name as written in the source. */
  name: string;
  usage: string;
  source: TokenSource;
  status: TokenStatus;
  /** Decision or conflict IDs in docs/GAPS.md. */
  refs?: readonly string[];
}

export interface ColorToken extends BaseToken {
  kind: 'color';
  value: string | null;
}

export interface GradientToken extends BaseToken {
  kind: 'gradient';
  stops: readonly string[];
}

export interface DimensionToken extends BaseToken {
  kind: 'dimension';
  px: number;
}

export interface TypographyToken extends BaseToken {
  kind: 'typography';
  size: Range;
  weight: number;
  family: 'sans' | 'mono' | null;
  textTransform?: 'uppercase';
  letterSpacing?: 'tight' | 'wide';
}

export interface ShadowToken extends BaseToken {
  kind: 'shadow';
  value: string;
}

export interface MotionToken extends BaseToken {
  kind: 'motion';
  element: string;
  trigger: string;
  animation: string;
  /** Duration in ms; `null` for continuous animations. */
  duration: Range | null;
  easing: string;
}

export interface BreakpointToken extends BaseToken {
  kind: 'breakpoint';
  /** Lower bound in px (inclusive); `null` when open. */
  minWidth: number | null;
  /** Upper bound in px (inclusive); `null` when open. */
  maxWidth: number | null;
}

const h = (line: number, spec: string): TokenSource => ({ file: HANDOFF, line, spec });
const k = (spec: string): TokenSource => ({ file: BRAND_KIT, line: 0, spec });

export const colors = {
  primaryBlue: {
    kind: 'color',
    name: 'color-primary-blue',
    value: '#0A63C9',
    usage: 'Primary CTA buttons, header bars, links, focus ring',
    source: h(12, '`#0A63C9`–`#1565D8`'),
    status: 'resolved',
    refs: ['IC1'],
  },
  accentRed: {
    kind: 'color',
    name: 'color-accent-red',
    value: '#D93341',
    usage: 'Calendar event highlight, timer/urgency accents',
    source: h(13, '`#D93341`'),
    status: 'resolved',
  },
  surface: {
    kind: 'color',
    name: 'color-surface',
    value: '#FFFFFF',
    usage: 'Modal/card backgrounds, list rows',
    source: h(14, '`#FFFFFF`'),
    status: 'resolved',
  },
  surfaceMuted: {
    kind: 'color',
    name: 'color-surface-muted',
    value: '#F3F4F6',
    usage: 'Popover background, disabled rows, code chip background',
    source: h(15, '`#F3F4F6`'),
    status: 'resolved',
    refs: ['IC3'],
  },
  overlayScrim: {
    kind: 'color',
    name: 'color-overlay-scrim',
    value: 'rgba(0,0,0,0.35)',
    usage: 'Backdrop behind modal dialogs',
    source: h(16, '`rgba(0,0,0,0.35)`'),
    status: 'resolved',
  },
  textPrimary: {
    kind: 'color',
    name: 'color-text-primary',
    value: '#1A1A1A',
    usage: 'Headings, primary copy',
    source: h(17, '`#1A1A1A`'),
    status: 'resolved',
  },
  textSecondary: {
    kind: 'color',
    name: 'color-text-secondary',
    value: '#6B6F76',
    usage: 'Timestamps, helper text, meta labels',
    source: h(18, '`#6B6F76`'),
    status: 'resolved',
  },
  border: {
    kind: 'color',
    name: 'color-border',
    value: '#E2E4E8',
    usage: 'Card outlines, list dividers',
    source: h(19, '`#E2E4E8`'),
    status: 'resolved',
    refs: ['IC3'],
  },
  aiSuggestionBg: {
    kind: 'color',
    name: 'color-ai-suggestion-bg',
    value: '#EAF1FE',
    usage: 'User-prompt bubble inside AI panels',
    source: h(142, '`#EAF1FE`'),
    status: 'resolved',
  },
  successCheck: {
    kind: 'color',
    name: 'color-success-check',
    value: '#2E7D32',
    usage: 'Accepted-suggestion checkmark bullets in AI coaching card',
    source: h(143, '`#2E7D32` (green circle) / blue check variants also seen'),
    status: 'conflict',
    refs: ['IC4'],
  },
  coachingPanelBg: {
    kind: 'color',
    name: 'color-coaching-panel-bg',
    value: '#FFFFFF',
    usage: 'Floating inline-editor coaching popover (with shadow-modal)',
    source: h(144, '`#FFFFFF` with `shadow-modal`'),
    status: 'resolved',
  },
  rsvpAccept: {
    kind: 'color',
    name: 'color-rsvp-accept',
    value: '#0A63C9',
    usage: '"Edit RSVP" outline pill on accepted event',
    source: h(145, '`#0A63C9` outline pill'),
    status: 'resolved',
  },
  teamsBadge: {
    kind: 'color',
    name: 'color-teams-badge',
    value: '#5B5FC7',
    usage: '"Join Teams Meeting" button / Teams icon accent',
    source: h(146, '`#5B5FC7`'),
    status: 'resolved',
    refs: ['IC5'],
  },
  calendarGridline: {
    kind: 'color',
    name: 'color-calendar-gridline',
    value: '#E7E9ED',
    usage: 'Day/Week timeline rows (dashed for half-hours)',
    source: h(147, '`#E7E9ED`, dashed for half-hours'),
    status: 'resolved',
  },
  currentTimeIndicator: {
    kind: 'color',
    name: 'color-current-time-indicator',
    value: null,
    usage: 'Current time marker in Day view (implied)',
    source: h(148, 'accent-blue thin rule'),
    status: 'gap',
    refs: ['IG5'],
  },
  sidebarBg: {
    kind: 'color',
    name: 'color-sidebar-bg',
    value: '#FFFFFF',
    usage: 'Mobile mail account/folder list',
    source: h(149, '`#FFFFFF`'),
    status: 'resolved',
  },
  folderUnreadBadge: {
    kind: 'color',
    name: 'color-folder-unread-badge',
    value: '#EDEFF2',
    usage: 'Folder row unread counts (pill, dark text)',
    source: h(150, '`#EDEFF2` pill, dark text'),
    status: 'resolved',
  },
  marketingInk: {
    kind: 'color',
    name: 'color-marketing-ink',
    value: '#0B0B0E',
    usage: 'Marketing site headline black text',
    source: h(152, '`#0B0B0E`'),
    status: 'resolved',
  },
  marketingCtaPrimary: {
    kind: 'color',
    name: 'color-marketing-cta-primary',
    value: '#2547E0',
    usage: '"Get Started" / "Watch Demo" solid buttons',
    source: h(153, '`#2547E0`'),
    status: 'resolved',
  },
  marketingCtaSecondary: {
    kind: 'color',
    name: 'color-marketing-cta-secondary',
    value: '#FFFFFF',
    usage: '"View Docs" outline buttons (+ 1px border)',
    source: h(154, '`#FFFFFF` + 1px border'),
    status: 'resolved',
  },
  brandKitBlue: {
    kind: 'color',
    name: 'brand_blue',
    value: '#1F5ECC',
    usage: 'Logo asset colour (sampled from approved raster) — not a UI token (IC0/IC1)',
    source: k('"brand_blue": "#1F5ECC"'),
    status: 'resolved',
    refs: ['IC0', 'IC1', 'IC1b'],
  },
  brandKitBoardFill: {
    kind: 'color',
    name: 'board_fill',
    value: '#F0F0F1',
    usage: 'Logo board fill — not a UI token (IC3)',
    source: k('"board_fill": "#F0F0F1"'),
    status: 'resolved',
    refs: ['IC3'],
  },
  brandKitBoardLine: {
    kind: 'color',
    name: 'board_line',
    value: '#D5D6D8',
    usage: 'Logo board outline — not a UI token (IC3)',
    source: k('"board_line": "#D5D6D8"'),
    status: 'resolved',
    refs: ['IC3'],
  },
} as const satisfies Record<string, ColorToken>;

export const gradients = {
  marketingHeroBlue: {
    kind: 'gradient',
    name: 'color-marketing-hero-blue',
    stops: ['#2F6FED', '#BFD6FF'],
    usage: 'Hero headline word-highlight & wave/dot-matrix illustration',
    source: h(151, '`#2F6FED`→`#BFD6FF` gradient'),
    status: 'resolved',
  },
  promoCardBg: {
    kind: 'gradient',
    name: 'color-promo-card-bg',
    stops: ['#EAF2FF', '#FBF3EC'],
    usage: '"Happening Now" promo card background',
    source: h(158, 'soft gradient `#EAF2FF`→`#FBF3EC`'),
    status: 'resolved',
  },
} as const satisfies Record<string, GradientToken>;

export const radii = {
  sm: {
    kind: 'dimension',
    name: 'radius-sm',
    px: 6,
    usage: 'Chips, badges, code block',
    source: h(20, '6px'),
    status: 'resolved',
  },
  md: {
    kind: 'dimension',
    name: 'radius-md',
    px: 12,
    usage: 'Buttons, list rows, dropdown panel',
    source: h(21, '12px'),
    status: 'resolved',
  },
  lg: {
    kind: 'dimension',
    name: 'radius-lg',
    px: 20,
    usage: 'Modal / dialog card, tooltip card',
    source: h(22, '20px'),
    status: 'resolved',
  },
} as const satisfies Record<string, DimensionToken>;

export const spacing = {
  xs: {
    kind: 'dimension',
    name: 'spacing-xs',
    px: 4,
    usage: 'Icon-to-label gap',
    source: h(23, '4px'),
    status: 'resolved',
  },
  sm: {
    kind: 'dimension',
    name: 'spacing-sm',
    px: 8,
    usage: 'Internal row padding',
    source: h(24, '8px'),
    status: 'resolved',
  },
  md: {
    kind: 'dimension',
    name: 'spacing-md',
    px: 16,
    usage: 'Card internal padding, section gaps',
    source: h(25, '16px'),
    status: 'resolved',
  },
  lg: {
    kind: 'dimension',
    name: 'spacing-lg',
    px: 24,
    usage: 'Modal padding, panel padding',
    source: h(26, '24px'),
    status: 'resolved',
  },
  xl: {
    kind: 'dimension',
    name: 'spacing-xl',
    px: 32,
    usage: 'Space above/below hero heading in modal',
    source: h(27, '32px'),
    status: 'resolved',
  },
} as const satisfies Record<string, DimensionToken>;

export const typography = {
  headingLg: {
    kind: 'typography',
    name: 'font-heading-lg',
    size: { min: 28, max: 32 },
    weight: 700,
    family: 'sans',
    usage: 'Modal titles',
    source: h(28, '28–32px / 700 / system sans'),
    status: 'resolved',
    refs: ['IC2', 'IG1'],
  },
  headingMd: {
    kind: 'typography',
    name: 'font-heading-md',
    size: { min: 20, max: 22 },
    weight: 600,
    family: null,
    usage: 'Panel/card titles, email subject line',
    source: h(29, '20–22px / 600'),
    status: 'resolved',
    refs: ['IC2'],
  },
  body: {
    kind: 'typography',
    name: 'font-body',
    size: { min: 14, max: 16 },
    weight: 400,
    family: null,
    usage: 'Paragraph copy, list items',
    source: h(30, '14–16px / 400'),
    status: 'resolved',
    refs: ['IC2'],
  },
  caption: {
    kind: 'typography',
    name: 'font-caption',
    size: { min: 12, max: 13 },
    weight: 400,
    family: null,
    usage: 'Timestamps, disclaimers',
    source: h(31, '12–13px / 400'),
    status: 'resolved',
    refs: ['IC2'],
  },
  mono: {
    kind: 'typography',
    name: 'font-mono',
    size: { min: 15, max: 15 },
    weight: 500,
    family: 'mono',
    usage: 'OTP code chip',
    source: h(32, '15px / 500 / monospace'),
    status: 'resolved',
    refs: ['IG1'],
  },
  marketingDisplay: {
    kind: 'typography',
    name: 'font-marketing-display',
    size: { min: 44, max: 56 },
    weight: 700,
    family: null,
    letterSpacing: 'tight',
    usage: 'Landing-page hero headline, two-tone',
    source: h(155, '44–56px / 700 / tight tracking'),
    status: 'resolved',
    refs: ['IC2', 'IG2'],
  },
  marketingEyebrow: {
    kind: 'typography',
    name: 'font-marketing-eyebrow',
    size: { min: 11, max: 12 },
    weight: 600,
    family: null,
    textTransform: 'uppercase',
    letterSpacing: 'wide',
    usage: '"THE PROBLEM", "TRUSTED BY SECURITY TEAMS AT", "HAPPENING NOW"',
    source: h(156, '11–12px / 600 / uppercase / letter-spaced'),
    status: 'resolved',
    refs: ['IC2', 'IG2'],
  },
} as const satisfies Record<string, TypographyToken>;

export const shadows = {
  modal: {
    kind: 'shadow',
    name: 'shadow-modal',
    value: '0 8px 24px rgba(0,0,0,0.15)',
    usage: 'Elevated dialogs, popovers, tooltips',
    source: h(33, '`0 8px 24px rgba(0,0,0,0.15)`'),
    status: 'resolved',
  },
} as const satisfies Record<string, ShadowToken>;

const m = (
  line: number,
  element: string,
  trigger: string,
  animation: string,
  duration: Range | null,
  easing: string,
  spec: string,
): MotionToken => ({
  kind: 'motion',
  name: `motion-${element}`,
  element,
  trigger,
  animation,
  duration,
  easing,
  usage: `${element} — ${trigger}`,
  source: h(line, spec),
  status: 'resolved',
  refs: duration && duration.min !== duration.max ? ['IC2'] : [],
});

export const motion = {
  modalDefaultAppPrompt: m(
    112,
    'Modal.DefaultAppPrompt',
    'Screen load',
    'Fade + slight scale-up from 96%→100%, backdrop blurs',
    { min: 200, max: 250 },
    'ease-out',
    '200–250ms / ease-out',
  ),
  popoverAppLauncher: m(
    113,
    'Popover.AppLauncher',
    'Icon tap',
    'Scale + fade in, anchored top-right of trigger',
    { min: 150, max: 150 },
    'ease-out',
    '150ms / ease-out',
  ),
  accountSwitcherGroup: m(
    114,
    'AccountSwitcher.Dropdown group',
    'Chevron tap',
    'Height auto-expand/collapse',
    { min: 180, max: 180 },
    'ease-in-out',
    '180ms / ease-in-out',
  ),
  aiPanelSidePanel: m(
    115,
    'AIPanel.SidePanel',
    'Open',
    'Slide in from right edge',
    { min: 220, max: 220 },
    'ease-out',
    '220ms / ease-out',
  ),
  tooltipFeatureIntro: m(
    116,
    'Tooltip.FeatureIntro',
    'Appear',
    'Fade + slide up 8px, pointer arrow appears last',
    { min: 200, max: 200 },
    'ease-out',
    '200ms / ease-out',
  ),
  codeChip: m(
    117,
    'CodeChip',
    'Copy tap',
    'Brief scale-down/up "pulse" + inline confirmation fade',
    { min: 120, max: 120 },
    'ease-in-out',
    '120ms / ease-in-out',
  ),
  eventDetailPopover: m(
    231,
    'EventDetailPopover',
    'Event tap',
    'Scale + fade in anchored at event block, small drop shadow grows',
    { min: 150, max: 200 },
    'ease-out',
    '150–200ms / ease-out',
  ),
  coachingPopoverAccept: m(
    232,
    'InlineEditor.CoachingPopover',
    'Suggestion accepted',
    'Checkmark fill + subtle bounce',
    { min: 120, max: 120 },
    'spring/ease-out',
    '120ms / spring/ease-out',
  ),
  modalNewEvent: m(
    233,
    'Modal.NewEvent',
    'Open',
    'Slide up from bottom edge, backdrop dims',
    { min: 250, max: 250 },
    'ease-out',
    '250ms / ease-out',
  ),
  dropdownViewSwitcher: m(
    234,
    'Dropdown.ViewSwitcher',
    'Open/close',
    'Fade + scale from anchor icon',
    { min: 150, max: 150 },
    'ease-out',
    '150ms / ease-out',
  ),
  messageListItemGrouped: m(
    235,
    'MessageListItem.Grouped',
    'Expand tap',
    'Cross-fade from grouped row into filtered list screen',
    { min: 200, max: 200 },
    'ease-in-out',
    '200ms / ease-in-out',
  ),
  marketingHeroIllustration: m(
    236,
    'MarketingSite.Hero illustration',
    'Scroll-into-view',
    'Dot-matrix gradient sweeps in / fades up',
    { min: 400, max: 600 },
    'ease-out',
    '400–600ms / ease-out, once per view',
  ),
  promoCardCollage: m(
    237,
    'PromoCard.HappeningNow collage',
    'Idle/auto',
    'Slight parallax drift of the fanned background cards',
    null,
    'linear',
    'continuous, slow / linear',
  ),
} as const satisfies Record<string, MotionToken>;

export const breakpoints = {
  mobile: {
    kind: 'breakpoint',
    name: 'breakpoint-mobile',
    minWidth: null,
    maxWidth: 767,
    usage: 'Mobile (<768px)',
    source: h(92, 'Mobile (<768px)'),
    status: 'resolved',
  },
  tabletPortrait: {
    kind: 'breakpoint',
    name: 'breakpoint-tablet-portrait',
    minWidth: 768,
    maxWidth: 1024,
    usage: 'Tablet portrait (768–1024px)',
    source: h(91, 'Tablet portrait (768–1024px)'),
    status: 'resolved',
  },
  desktop: {
    kind: 'breakpoint',
    name: 'breakpoint-desktop',
    minWidth: 1025,
    maxWidth: null,
    usage: 'Desktop / tablet landscape (>1024px)',
    source: h(90, 'Desktop / tablet landscape (>1024px)'),
    status: 'resolved',
  },
  tabletLandscapeWide: {
    kind: 'breakpoint',
    name: 'breakpoint-tablet-landscape-wide',
    minWidth: 1024,
    maxWidth: 1200,
    usage: 'Tablet landscape (iPad width, ~1024–1200px)',
    source: h(210, 'Tablet landscape (iPad width, ~1024–1200px)'),
    status: 'resolved',
  },
} as const satisfies Record<string, BreakpointToken>;

/** Graphic patterns named by the source without a reproducible value. */
export const patterns = {
  dotMatrix: {
    name: 'pattern-dot-matrix',
    usage: 'Hero background illustration (decorative, not text)',
    source: h(157, 'halftone dot gradient graphic'),
    status: 'gap',
    refs: ['IG6'],
  },
} as const;

export const identity = {
  colors,
  gradients,
  radii,
  spacing,
  typography,
  shadows,
  motion,
  breakpoints,
  patterns,
} as const;
