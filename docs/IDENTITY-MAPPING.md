# Identity mapping — ZIP → tokens → Fluent

> Gerado por `packages/tokens/scripts/identity-mapping.ts` — não editar à mão.
> Fontes: [handoff](sources/design-system-zip/handoff-spec-onboarding-patterns.md), [brand kit](sources/brand-kit/brand/palette.json).
> Decisões e conflitos: [GAPS.md](GAPS.md).

## Regras aplicadas

- **IC1:** cor primária `#0A63C9` (decisão do usuário).
- **IC2:** faixas de tamanho → `clamp()` entre 768 e 1024 px (ex.: 14–16px → `clamp(14px, 8px + 0.7813vw, 16px)`); faixas de motion → limite superior por padrão, inferior com `prefers-reduced-motion: reduce`.
- **IG3:** ramp de 16 tons derivado em OKLab: tom 80 = primária; tons escuros misturam até 80% de preto (tom 10); tons claros até 90% de branco (tom 160). Status: `derived`.
- **IG2:** tokens Fluent não listados abaixo mantêm o valor de `createLightTheme(brandRamp)` — a identidade é silente sobre eles (line-height, stroke widths, durations Fluent etc.). Sem tema dark.

## 1. Tokens da identidade

| Token                                    | Grupo       | Valor especificado                                       | Status   | Fonte                                   | Refs           |
| ---------------------------------------- | ----------- | -------------------------------------------------------- | -------- | --------------------------------------- | -------------- |
| `color-primary-blue`                     | colors      | `#0A63C9`–`#1565D8`                                      | resolved | handoff-spec-onboarding-patterns.md:12  | IC1            |
| `color-accent-red`                       | colors      | `#D93341`                                                | resolved | handoff-spec-onboarding-patterns.md:13  |                |
| `color-surface`                          | colors      | `#FFFFFF`                                                | resolved | handoff-spec-onboarding-patterns.md:14  |                |
| `color-surface-muted`                    | colors      | `#F3F4F6`                                                | resolved | handoff-spec-onboarding-patterns.md:15  | IC3            |
| `color-overlay-scrim`                    | colors      | `rgba(0,0,0,0.35)`                                       | resolved | handoff-spec-onboarding-patterns.md:16  |                |
| `color-text-primary`                     | colors      | `#1A1A1A`                                                | resolved | handoff-spec-onboarding-patterns.md:17  |                |
| `color-text-secondary`                   | colors      | `#6B6F76`                                                | resolved | handoff-spec-onboarding-patterns.md:18  |                |
| `color-border`                           | colors      | `#E2E4E8`                                                | resolved | handoff-spec-onboarding-patterns.md:19  | IC3            |
| `color-ai-suggestion-bg`                 | colors      | `#EAF1FE`                                                | resolved | handoff-spec-onboarding-patterns.md:142 |                |
| `color-success-check`                    | colors      | `#2E7D32` (green circle) / blue check variants also seen | conflict | handoff-spec-onboarding-patterns.md:143 | IC4            |
| `color-coaching-panel-bg`                | colors      | `#FFFFFF` with `shadow-modal`                            | resolved | handoff-spec-onboarding-patterns.md:144 |                |
| `color-rsvp-accept`                      | colors      | `#0A63C9` outline pill                                   | resolved | handoff-spec-onboarding-patterns.md:145 |                |
| `color-teams-badge`                      | colors      | `#5B5FC7`                                                | resolved | handoff-spec-onboarding-patterns.md:146 | IC5            |
| `color-calendar-gridline`                | colors      | `#E7E9ED`, dashed for half-hours                         | resolved | handoff-spec-onboarding-patterns.md:147 |                |
| `color-current-time-indicator`           | colors      | accent-blue thin rule                                    | gap      | handoff-spec-onboarding-patterns.md:148 | IG5            |
| `color-sidebar-bg`                       | colors      | `#FFFFFF`                                                | resolved | handoff-spec-onboarding-patterns.md:149 |                |
| `color-folder-unread-badge`              | colors      | `#EDEFF2` pill, dark text                                | resolved | handoff-spec-onboarding-patterns.md:150 |                |
| `color-marketing-ink`                    | colors      | `#0B0B0E`                                                | resolved | handoff-spec-onboarding-patterns.md:152 |                |
| `color-marketing-cta-primary`            | colors      | `#2547E0`                                                | resolved | handoff-spec-onboarding-patterns.md:153 |                |
| `color-marketing-cta-secondary`          | colors      | `#FFFFFF` + 1px border                                   | resolved | handoff-spec-onboarding-patterns.md:154 |                |
| `brand_blue`                             | colors      | "brand_blue": "#1F5ECC"                                  | resolved | palette.json                            | IC0, IC1, IC1b |
| `board_fill`                             | colors      | "board_fill": "#F0F0F1"                                  | resolved | palette.json                            | IC3            |
| `board_line`                             | colors      | "board_line": "#D5D6D8"                                  | resolved | palette.json                            | IC3            |
| `color-marketing-hero-blue`              | gradients   | `#2F6FED`→`#BFD6FF` gradient                             | resolved | handoff-spec-onboarding-patterns.md:151 |                |
| `color-promo-card-bg`                    | gradients   | soft gradient `#EAF2FF`→`#FBF3EC`                        | resolved | handoff-spec-onboarding-patterns.md:158 |                |
| `radius-sm`                              | radii       | 6px                                                      | resolved | handoff-spec-onboarding-patterns.md:20  |                |
| `radius-md`                              | radii       | 12px                                                     | resolved | handoff-spec-onboarding-patterns.md:21  |                |
| `radius-lg`                              | radii       | 20px                                                     | resolved | handoff-spec-onboarding-patterns.md:22  |                |
| `spacing-xs`                             | spacing     | 4px                                                      | resolved | handoff-spec-onboarding-patterns.md:23  |                |
| `spacing-sm`                             | spacing     | 8px                                                      | resolved | handoff-spec-onboarding-patterns.md:24  |                |
| `spacing-md`                             | spacing     | 16px                                                     | resolved | handoff-spec-onboarding-patterns.md:25  |                |
| `spacing-lg`                             | spacing     | 24px                                                     | resolved | handoff-spec-onboarding-patterns.md:26  |                |
| `spacing-xl`                             | spacing     | 32px                                                     | resolved | handoff-spec-onboarding-patterns.md:27  |                |
| `font-heading-lg`                        | typography  | 28–32px / 700 / system sans                              | resolved | handoff-spec-onboarding-patterns.md:28  | IC2, IG1       |
| `font-heading-md`                        | typography  | 20–22px / 600                                            | resolved | handoff-spec-onboarding-patterns.md:29  | IC2            |
| `font-body`                              | typography  | 14–16px / 400                                            | resolved | handoff-spec-onboarding-patterns.md:30  | IC2            |
| `font-caption`                           | typography  | 12–13px / 400                                            | resolved | handoff-spec-onboarding-patterns.md:31  | IC2            |
| `font-mono`                              | typography  | 15px / 500 / monospace                                   | resolved | handoff-spec-onboarding-patterns.md:32  | IG1            |
| `font-marketing-display`                 | typography  | 44–56px / 700 / tight tracking                           | resolved | handoff-spec-onboarding-patterns.md:155 | IC2, IG2       |
| `font-marketing-eyebrow`                 | typography  | 11–12px / 600 / uppercase / letter-spaced                | resolved | handoff-spec-onboarding-patterns.md:156 | IC2, IG2       |
| `shadow-modal`                           | shadows     | `0 8px 24px rgba(0,0,0,0.15)`                            | resolved | handoff-spec-onboarding-patterns.md:33  |                |
| `motion-Modal.DefaultAppPrompt`          | motion      | 200–250ms / ease-out                                     | resolved | handoff-spec-onboarding-patterns.md:112 | IC2            |
| `motion-Popover.AppLauncher`             | motion      | 150ms / ease-out                                         | resolved | handoff-spec-onboarding-patterns.md:113 |                |
| `motion-AccountSwitcher.Dropdown group`  | motion      | 180ms / ease-in-out                                      | resolved | handoff-spec-onboarding-patterns.md:114 |                |
| `motion-AIPanel.SidePanel`               | motion      | 220ms / ease-out                                         | resolved | handoff-spec-onboarding-patterns.md:115 |                |
| `motion-Tooltip.FeatureIntro`            | motion      | 200ms / ease-out                                         | resolved | handoff-spec-onboarding-patterns.md:116 |                |
| `motion-CodeChip`                        | motion      | 120ms / ease-in-out                                      | resolved | handoff-spec-onboarding-patterns.md:117 |                |
| `motion-EventDetailPopover`              | motion      | 150–200ms / ease-out                                     | resolved | handoff-spec-onboarding-patterns.md:231 | IC2            |
| `motion-InlineEditor.CoachingPopover`    | motion      | 120ms / spring/ease-out                                  | resolved | handoff-spec-onboarding-patterns.md:232 |                |
| `motion-Modal.NewEvent`                  | motion      | 250ms / ease-out                                         | resolved | handoff-spec-onboarding-patterns.md:233 |                |
| `motion-Dropdown.ViewSwitcher`           | motion      | 150ms / ease-out                                         | resolved | handoff-spec-onboarding-patterns.md:234 |                |
| `motion-MessageListItem.Grouped`         | motion      | 200ms / ease-in-out                                      | resolved | handoff-spec-onboarding-patterns.md:235 |                |
| `motion-MarketingSite.Hero illustration` | motion      | 400–600ms / ease-out, once per view                      | resolved | handoff-spec-onboarding-patterns.md:236 | IC2            |
| `motion-PromoCard.HappeningNow collage`  | motion      | continuous, slow / linear                                | resolved | handoff-spec-onboarding-patterns.md:237 |                |
| `breakpoint-mobile`                      | breakpoints | Mobile (<768px)                                          | resolved | handoff-spec-onboarding-patterns.md:92  |                |
| `breakpoint-tablet-portrait`             | breakpoints | Tablet portrait (768–1024px)                             | resolved | handoff-spec-onboarding-patterns.md:91  |                |
| `breakpoint-desktop`                     | breakpoints | Desktop / tablet landscape (>1024px)                     | resolved | handoff-spec-onboarding-patterns.md:90  |                |
| `breakpoint-tablet-landscape-wide`       | breakpoints | Tablet landscape (iPad width, ~1024–1200px)              | resolved | handoff-spec-onboarding-patterns.md:210 |                |
| `pattern-dot-matrix`                     | patterns    | halftone dot gradient graphic                            | gap      | handoff-spec-onboarding-patterns.md:157 | IG6            |

## 2. Mapeamento semântico para Fluent (overrides)

| Token Fluent               | Token da identidade    | Valor                                                                                                   | Justificativa                                                    |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `colorNeutralForeground1`  | `color-text-primary`   | `#1A1A1A`                                                                                               | Primary text (headings, primary copy)                            |
| `colorNeutralForeground3`  | `color-text-secondary` | `#6B6F76`                                                                                               | Secondary/meta text (timestamps, helper text)                    |
| `colorNeutralBackground1`  | `color-surface`        | `#FFFFFF`                                                                                               | Default surface (cards, modals, list rows)                       |
| `colorNeutralBackground3`  | `color-surface-muted`  | `#F3F4F6`                                                                                               | Muted surface                                                    |
| `colorNeutralStroke2`      | `color-border`         | `#E2E4E8`                                                                                               | Card outlines and dividers                                       |
| `colorBackgroundOverlay`   | `color-overlay-scrim`  | `rgba(0,0,0,0.35)`                                                                                      | Dialog backdrop                                                  |
| `colorBrandForegroundLink` | `color-primary-blue`   | `#0A63C9`                                                                                               | Links use the primary blue                                       |
| `colorStrokeFocus2`        | `color-primary-blue`   | `#0A63C9`                                                                                               | Focus ring uses the primary blue                                 |
| `borderRadiusMedium`       | `radius-md`            | `12px`                                                                                                  | Fluent Button, Menu, Popover and Dropdown use borderRadiusMedium |
| `borderRadiusXLarge`       | `radius-lg`            | `20px`                                                                                                  | Fluent Dialog surface uses borderRadiusXLarge                    |
| `fontFamilyBase`           | `font-heading-lg`      | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` | "system sans" (IG1)                                              |
| `fontFamilyMonospace`      | `font-mono`            | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace`                   | "monospace" (IG1)                                                |
| `fontSizeBase200`          | `font-caption`         | `clamp(12px, 9px + 0.3906vw, 13px)`                                                                     | Fluent Caption1 size                                             |
| `fontSizeBase300`          | `font-body`            | `clamp(14px, 8px + 0.7813vw, 16px)`                                                                     | Fluent Body1 size                                                |
| `fontSizeBase500`          | `font-heading-md`      | `clamp(20px, 14px + 0.7813vw, 22px)`                                                                    | Fluent Subtitle1 size (panel/card titles)                        |
| `fontSizeHero700`          | `font-heading-lg`      | `clamp(28px, 16px + 1.5625vw, 32px)`                                                                    | Fluent Title2 size (modal titles)                                |
| `shadow16`                 | `shadow-modal`         | `0 8px 24px rgba(0,0,0,0.15)`                                                                           | Fluent Popover/Menu/Tooltip elevation                            |
| `shadow64`                 | `shadow-modal`         | `0 8px 24px rgba(0,0,0,0.15)`                                                                           | Fluent Dialog elevation                                          |

## 3. Ramp de marca derivado (IG3)

| Tom | Valor                |
| --- | -------------------- |
| 10  | `#00030F`            |
| 20  | `#000D25`            |
| 30  | `#01193D`            |
| 40  | `#022756`            |
| 50  | `#033571`            |
| 60  | `#05448D`            |
| 70  | `#0753AB`            |
| 80  | `#0A63C9` (primária) |
| 90  | `#3276D1`            |
| 100 | `#4E88D8`            |
| 110 | `#6899DF`            |
| 120 | `#81ABE5`            |
| 130 | `#9ABCEB`            |
| 140 | `#B4CDF1`            |
| 150 | `#CEDEF6`            |
| 160 | `#E8F0FB`            |

## 4. CSS custom properties próprias (`--blog-*`)

| Variável                                             | Valor                                                                                                   | Reduced motion |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------- |
| `--blog-color-primary-blue`                          | `#0A63C9`                                                                                               |                |
| `--blog-color-accent-red`                            | `#D93341`                                                                                               |                |
| `--blog-color-surface`                               | `#FFFFFF`                                                                                               |                |
| `--blog-color-surface-muted`                         | `#F3F4F6`                                                                                               |                |
| `--blog-color-overlay-scrim`                         | `rgba(0,0,0,0.35)`                                                                                      |                |
| `--blog-color-text-primary`                          | `#1A1A1A`                                                                                               |                |
| `--blog-color-text-secondary`                        | `#6B6F76`                                                                                               |                |
| `--blog-color-border`                                | `#E2E4E8`                                                                                               |                |
| `--blog-color-ai-suggestion-bg`                      | `#EAF1FE`                                                                                               |                |
| `--blog-color-coaching-panel-bg`                     | `#FFFFFF`                                                                                               |                |
| `--blog-color-rsvp-accept`                           | `#0A63C9`                                                                                               |                |
| `--blog-color-teams-badge`                           | `#5B5FC7`                                                                                               |                |
| `--blog-color-calendar-gridline`                     | `#E7E9ED`                                                                                               |                |
| `--blog-color-sidebar-bg`                            | `#FFFFFF`                                                                                               |                |
| `--blog-color-folder-unread-badge`                   | `#EDEFF2`                                                                                               |                |
| `--blog-color-marketing-ink`                         | `#0B0B0E`                                                                                               |                |
| `--blog-color-marketing-cta-primary`                 | `#2547E0`                                                                                               |                |
| `--blog-color-marketing-cta-secondary`               | `#FFFFFF`                                                                                               |                |
| `--blog-gradient-marketing-hero-blue`                | `linear-gradient(#2F6FED, #BFD6FF)`                                                                     |                |
| `--blog-gradient-promo-card-bg`                      | `linear-gradient(#EAF2FF, #FBF3EC)`                                                                     |                |
| `--blog-radius-sm`                                   | `6px`                                                                                                   |                |
| `--blog-radius-md`                                   | `12px`                                                                                                  |                |
| `--blog-radius-lg`                                   | `20px`                                                                                                  |                |
| `--blog-spacing-xs`                                  | `4px`                                                                                                   |                |
| `--blog-spacing-sm`                                  | `8px`                                                                                                   |                |
| `--blog-spacing-md`                                  | `16px`                                                                                                  |                |
| `--blog-spacing-lg`                                  | `24px`                                                                                                  |                |
| `--blog-spacing-xl`                                  | `32px`                                                                                                  |                |
| `--blog-font-heading-lg-size`                        | `clamp(28px, 16px + 1.5625vw, 32px)`                                                                    |                |
| `--blog-font-heading-lg-weight`                      | `700`                                                                                                   |                |
| `--blog-font-heading-md-size`                        | `clamp(20px, 14px + 0.7813vw, 22px)`                                                                    |                |
| `--blog-font-heading-md-weight`                      | `600`                                                                                                   |                |
| `--blog-font-body-size`                              | `clamp(14px, 8px + 0.7813vw, 16px)`                                                                     |                |
| `--blog-font-body-weight`                            | `400`                                                                                                   |                |
| `--blog-font-caption-size`                           | `clamp(12px, 9px + 0.3906vw, 13px)`                                                                     |                |
| `--blog-font-caption-weight`                         | `400`                                                                                                   |                |
| `--blog-font-mono-size`                              | `15px`                                                                                                  |                |
| `--blog-font-mono-weight`                            | `500`                                                                                                   |                |
| `--blog-font-marketing-display-size`                 | `clamp(44px, 8px + 4.6875vw, 56px)`                                                                     |                |
| `--blog-font-marketing-display-weight`               | `700`                                                                                                   |                |
| `--blog-font-marketing-eyebrow-size`                 | `clamp(11px, 8px + 0.3906vw, 12px)`                                                                     |                |
| `--blog-font-marketing-eyebrow-weight`               | `600`                                                                                                   |                |
| `--blog-font-family-sans`                            | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |                |
| `--blog-font-family-mono`                            | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace`                   |                |
| `--blog-motion-modal-default-app-prompt-duration`    | `250ms`                                                                                                 | `200ms`        |
| `--blog-motion-modal-default-app-prompt-easing`      | `ease-out`                                                                                              |                |
| `--blog-motion-popover-app-launcher-duration`        | `150ms`                                                                                                 |                |
| `--blog-motion-popover-app-launcher-easing`          | `ease-out`                                                                                              |                |
| `--blog-motion-account-switcher-group-duration`      | `180ms`                                                                                                 |                |
| `--blog-motion-account-switcher-group-easing`        | `ease-in-out`                                                                                           |                |
| `--blog-motion-ai-panel-side-panel-duration`         | `220ms`                                                                                                 |                |
| `--blog-motion-ai-panel-side-panel-easing`           | `ease-out`                                                                                              |                |
| `--blog-motion-tooltip-feature-intro-duration`       | `200ms`                                                                                                 |                |
| `--blog-motion-tooltip-feature-intro-easing`         | `ease-out`                                                                                              |                |
| `--blog-motion-code-chip-duration`                   | `120ms`                                                                                                 |                |
| `--blog-motion-code-chip-easing`                     | `ease-in-out`                                                                                           |                |
| `--blog-motion-event-detail-popover-duration`        | `200ms`                                                                                                 | `150ms`        |
| `--blog-motion-event-detail-popover-easing`          | `ease-out`                                                                                              |                |
| `--blog-motion-coaching-popover-accept-duration`     | `120ms`                                                                                                 |                |
| `--blog-motion-coaching-popover-accept-easing`       | `ease-out`                                                                                              |                |
| `--blog-motion-modal-new-event-duration`             | `250ms`                                                                                                 |                |
| `--blog-motion-modal-new-event-easing`               | `ease-out`                                                                                              |                |
| `--blog-motion-dropdown-view-switcher-duration`      | `150ms`                                                                                                 |                |
| `--blog-motion-dropdown-view-switcher-easing`        | `ease-out`                                                                                              |                |
| `--blog-motion-message-list-item-grouped-duration`   | `200ms`                                                                                                 |                |
| `--blog-motion-message-list-item-grouped-easing`     | `ease-in-out`                                                                                           |                |
| `--blog-motion-marketing-hero-illustration-duration` | `600ms`                                                                                                 | `400ms`        |
| `--blog-motion-marketing-hero-illustration-easing`   | `ease-out`                                                                                              |                |
| `--blog-motion-promo-card-collage-easing`            | `linear`                                                                                                |                |
| `--blog-breakpoint-mobile-max`                       | `767px`                                                                                                 |                |
| `--blog-breakpoint-tablet-portrait-min`              | `768px`                                                                                                 |                |
| `--blog-breakpoint-tablet-portrait-max`              | `1024px`                                                                                                |                |
| `--blog-breakpoint-desktop-min`                      | `1025px`                                                                                                |                |
| `--blog-breakpoint-tablet-landscape-wide-min`        | `1024px`                                                                                                |                |
| `--blog-breakpoint-tablet-landscape-wide-max`        | `1200px`                                                                                                |                |
