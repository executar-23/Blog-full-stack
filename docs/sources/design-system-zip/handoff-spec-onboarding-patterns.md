# Handoff Spec: Cross-App Onboarding & Productivity Patterns

## Overview
This spec covers the recurring UI patterns visible across the 7 screenshots: a **default-browser prompt** (Edge), a **calendar month grid + app switcher popover** (Outlook Calendar), an **account switcher + AI side-panel** (Outlook Mail + Copilot), a **login/OTP email card** (Linear), and a **feature-announcement tooltip with mode toggle** (Chat/Cowork). Each is broken into tokens, components, states, and edge cases so it can be rebuilt from scratch.

---

## Design Tokens Used

| Token | Value (approx.) | Usage |
|---|---|---|
| `color-primary-blue` | `#0A63C9`–`#1565D8` | Primary CTA buttons, header bars, links, focus ring |
| `color-accent-red` | `#D93341` | Calendar event highlight, timer/urgency accents |
| `color-surface` | `#FFFFFF` | Modal/card backgrounds, list rows |
| `color-surface-muted` | `#F3F4F6` | Popover background, disabled rows, code chip background |
| `color-overlay-scrim` | `rgba(0,0,0,0.35)` | Backdrop behind modal dialogs |
| `color-text-primary` | `#1A1A1A` | Headings, primary copy |
| `color-text-secondary` | `#6B6F76` | Timestamps, helper text, meta labels |
| `color-border` | `#E2E4E8` | Card outlines, list dividers |
| `radius-sm` | 6px | Chips, badges, code block |
| `radius-md` | 12px | Buttons, list rows, dropdown panel |
| `radius-lg` | 20px | Modal / dialog card, tooltip card |
| `spacing-xs` | 4px | Icon-to-label gap |
| `spacing-sm` | 8px | Internal row padding |
| `spacing-md` | 16px | Card internal padding, section gaps |
| `spacing-lg` | 24px | Modal padding, panel padding |
| `spacing-xl` | 32px | Space above/below hero heading in modal |
| `font-heading-lg` | 28–32px / 700 / system sans | Modal titles ("Make Edge Your Default Browser") |
| `font-heading-md` | 20–22px / 600 | Panel/card titles, email subject line |
| `font-body` | 14–16px / 400 | Paragraph copy, list items |
| `font-caption` | 12–13px / 400 | Timestamps, disclaimers ("AI-generated content may be incorrect") |
| `font-mono` | 15px / 500 / monospace | OTP code chip |
| `shadow-modal` | `0 8px 24px rgba(0,0,0,0.15)` | Elevated dialogs, popovers, tooltips |

---

## Components

| Component | Variant | Props | Notes |
|---|---|---|---|
| `Modal.DefaultAppPrompt` | Full-screen sheet | `title`, `previewImage`, `steps[]`, `primaryCta`, `secondaryCta` | Centered card over dimmed/blurred backdrop of the app underneath. Numbered steps use a circular badge (`1`/`2`/`3`) + bold keyword inline in body text. |
| `Button.Primary` | Full-width, pill/rounded-rect | `label`, `onPress`, `loading` | Solid blue fill, white text, `radius-md`, full-bleed width inside modal padding. |
| `Button.Text` | Inline link-style | `label`, `onPress` | Blue text, no background, centered below primary CTA (e.g. "Not Now", "Later"). |
| `StepList.Numbered` | Vertical, 3 rows | `steps: {index, text, boldTerm}[]` | Each row: circle-badge index + body text with one bold keyword; hairline divider between rows. |
| `AppHeader.TabSwitcher` | Segmented control | `tabs[]`, `activeTab` | Pill-shaped container, active tab has white/lighter background pill inside a colored bar (Mail/Calendar/Grid icon). |
| `Popover.AppLauncher` | Anchored dropdown | `items: {icon, label}[]`, `trailingAction` | White rounded panel, 3-icon grid, top-right "Reorder" text action. |
| `Calendar.MonthGrid` | 7-col grid | `weekdayLabels[]`, `days[]`, `events[]` | Day cells contain date number top-left; events render as colored chips below the date, left border accent stripe indicates category color. |
| `EventChip` | Single-line, truncating | `time`, `title`, `accentColor` | Format: `HH:MM  Title` truncated with ellipsis; colored left border + tinted background matching category. |
| `AccountSwitcher.Dropdown` | Nested list | `allAccountsSummary`, `groups: {icon,label,count}[]`, `accounts: {icon,name,email,isDefault}[]` | Header row shows aggregate ("All Accounts — N accounts") with checkmark + chevron; grouped sections (Work/Personal) collapse to a count with chevron; footer has "Create a profile" action + settings gear. |
| `AppShell.MailClient` | 3-pane layout | `folderNav`, `messageList`, `readingPane`, `aiPanel?` | Left nav (favorites/folders), center message list with Focused/Other tabs, right reading pane; optional 4th AI panel slides in from the right. |
| `MessageListItem` | Row | `avatar`, `sender`, `subject`, `preview`, `timestamp`, `unreadDot` | Avatar left, sender bold + subject bold-blue when unread, single-line preview truncated, timestamp right-aligned. |
| `AIPanel.SidePanel` | Docked right panel | `header`, `modeTabs (Work/Web)`, `conversation[]`, `suggestedActions[]`, `inputField` | Rounded card docked to the right of the reading pane; assistant responses use bullet summaries; footer shows quick-action buttons ("Draft reply", "Analyze further") above a message composer with mic + send icons. |
| `Disclaimer.Caption` | Static text | `text` | Small centered caption under AI input ("AI-generated content may be incorrect"). |
| `OnboardingCallout.Spotlight` | Overlay banner | `headline`, `screenshotPreview` | Full-bleed headline text over a blurred/dimmed background screenshot of the real UI, used for in-product feature announcements. |
| `EmailCard.OTP` | Transactional email body | `brandLogo`, `heading`, `instructionText`, `code`, `expiryNote`, `signature` | White card, logo top-left, bold heading, monospace code in a light-gray pill/box, small expiry caption beneath, sender name at the very bottom. |
| `CodeChip` | Monospace pill | `value` | Light-gray background, `radius-sm`, letter-spaced monospace text, selectable/copyable. |
| `Tooltip.FeatureIntro` | Coachmark | `title`, `body`, `stepIndicator ("1 of 3")`, `primaryCta`, `secondaryCta`, `modeOptions[]` | Dark-blue rounded card with a pointer/arrow graphic; contains two selectable pill buttons (mode choice) above the copy; footer has step counter left, "Later"/"Next" actions right. |
| `SegmentedChoice.PillGroup` | 2-option toggle | `options: {label}[]`, `selected` | Two rounded pill buttons side by side, light background, used inside coachmarks to preview a merged-feature choice. |

---

## States and Interactions

| Element | State | Behavior |
|---|---|---|
| `Button.Primary` (Set as Default Browser) | Default | Solid `color-primary-blue`, white label |
| `Button.Primary` | Pressed | Background darkens ~10% |
| `Button.Primary` | Disabled | 40% opacity, no pointer events |
| `AppHeader.TabSwitcher` | Tab active | Pill background lightens, label bolds |
| `Popover.AppLauncher` | Open | Fades/scales in from anchor icon, `shadow-modal` |
| `Popover.AppLauncher` | Dismiss | Tap outside or select an item closes it |
| `AccountSwitcher.Dropdown` | Group collapsed | Shows count only; chevron rotates 180° on expand |
| `EventChip` | Hover (desktop) | Slight background darken, cursor pointer |
| `EventChip` | Overflow (>1 event/day) | Shows first event + "N more" affordance |
| `MessageListItem` | Unread | Bold subject + solid unread dot leading the row |
| `MessageListItem` | Selected | Row background tinted `color-surface-muted`, left accent bar |
| `AIPanel.SidePanel` | Loading | Skeleton lines or animated ellipsis while response streams |
| `AIPanel.SidePanel` | Suggested action tapped | Inserts a new user bubble ("Summarize this email") then streams assistant bubble below |
| `CodeChip` | Tap/copy | Brief inline "Copied" confirmation, code remains visible |
| `EmailCard.OTP` | Expired | Code chip becomes muted/struck-through if opened after expiry window (implementation-dependent — not shown in screenshot, spec as edge case) |
| `Tooltip.FeatureIntro` | Step change | "Next" advances step indicator (e.g. "1 of 3" → "2 of 3"); "Later" dismisses entirely |
| `SegmentedChoice.PillGroup` | Selected pill | Filled/lighter background + border to indicate active choice |

---

## Responsive Behavior

| Breakpoint | Changes |
|---|---|
| Desktop / tablet landscape (>1024px) | 3–4 pane mail layout as shown (nav + list + reading pane + optional AI panel); calendar shows full 7-column month grid |
| Tablet portrait (768–1024px) | AI side panel likely becomes an overlay/drawer rather than a persistent 4th column; account switcher popover width reduces |
| Mobile (<768px) | Mail client collapses to single-pane navigation (list → detail → AI panel as separate screens); calendar month grid may switch to a scrollable list or condensed week view; modal dialogs (Edge prompt, coachmarks) go full-screen edge-to-edge |

---

## Edge Cases

- **Long event/subject titles**: truncate with ellipsis at container edge (see `[RC W4-002] Ne…` and `Apartment Parking Spot Op…` in screenshots) — never wrap and break row height.
- **Many accounts in switcher**: group into "Work" / "Personal" buckets with counts rather than listing every account flat once count exceeds ~3.
- **Multiple events same day**: stack chips vertically until a max (e.g. 2–3), then collapse to "+N more."
- **AI panel empty state**: before any query, show the suggested-action chips only (no conversation history).
- **AI panel slow/failed response**: show a retry affordance; never leave the loading state indefinitely.
- **OTP code near expiry**: countdown or expiry text should update ("valid for 5 minutes" → could tick down or gray out post-expiry).
- **Coachmark on last step**: "Next" becomes "Done"/"Got it" on the final step of the sequence (3 of 3).

---

## Animation / Motion

| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| `Modal.DefaultAppPrompt` | Screen load | Fade + slight scale-up from 96%→100%, backdrop blurs | 200–250ms | ease-out |
| `Popover.AppLauncher` | Icon tap | Scale + fade in, anchored top-right of trigger | 150ms | ease-out |
| `AccountSwitcher.Dropdown` group | Chevron tap | Height auto-expand/collapse | 180ms | ease-in-out |
| `AIPanel.SidePanel` | Open | Slide in from right edge | 220ms | ease-out |
| `Tooltip.FeatureIntro` | Appear | Fade + slide up 8px, pointer arrow appears last | 200ms | ease-out |
| `CodeChip` | Copy tap | Brief scale-down/up "pulse" + inline confirmation fade | 120ms | ease-in-out |

---

## Accessibility Notes

- Modal dialogs (`Modal.DefaultAppPrompt`, `Tooltip.FeatureIntro`) trap focus and return it to the triggering element on dismiss.
- Numbered step list should be announced as an ordered list (`role="list"`, `aria-posinset`/`aria-setsize` or native `<ol>`).
- `EventChip` and `MessageListItem` need accessible names combining time/sender + title, not relying on color/left-border alone to convey category.
- `AccountSwitcher.Dropdown` checkmark on "All Accounts" needs `aria-selected`/`aria-checked` equivalent, and expand/collapse chevrons need `aria-expanded`.
- `CodeChip` should be reachable via keyboard with a visible copy action, not just click-to-select text.
- `AIPanel.SidePanel` streaming responses should use `aria-live="polite"` so updates are announced without stealing focus.
- Coachmark step indicator ("1 of 3") should be exposed to assistive tech as part of the dialog's accessible description, and "Later"/"Next" need distinct, unambiguous labels (not just icons).

---
---

# Addendum: Additional Screens (Batch 2)

Adds AI-assisted email/calendar flows, mobile (iPad-width) Mail & Calendar patterns, and two unrelated marketing-site design systems captured in the same batch.

## Design Tokens Used (Addendum)

| Token | Value (approx.) | Usage |
|---|---|---|
| `color-ai-suggestion-bg` | `#EAF1FE` | User-prompt bubble inside AI panels ("Help me reply...") |
| `color-success-check` | `#2E7D32` (green circle) / blue check variants also seen | Accepted-suggestion checkmark bullets in AI coaching card |
| `color-coaching-panel-bg` | `#FFFFFF` with `shadow-modal` | Floating inline-editor coaching popover |
| `color-rsvp-accept` | `#0A63C9` outline pill | "Edit RSVP" button on accepted event |
| `color-teams-badge` | `#5B5FC7` | "Join Teams Meeting" button / Teams icon accent |
| `color-calendar-gridline` | `#E7E9ED`, dashed for half-hours | Day/Week timeline rows |
| `color-current-time-indicator` | accent-blue thin rule | (implied) current time marker in Day view |
| `color-sidebar-bg` | `#FFFFFF` | Mobile mail account/folder list |
| `color-folder-unread-badge` | `#EDEFF2` pill, dark text | Folder row unread counts |
| `color-marketing-hero-blue` | `#2F6FED`→`#BFD6FF` gradient | Guardbase / Dataguard hero headline word-highlight & wave/dot-matrix illustration |
| `color-marketing-ink` | `#0B0B0E` | Marketing site headline black text |
| `color-marketing-cta-primary` | `#2547E0` | "Get Started" / "Watch Demo" solid buttons |
| `color-marketing-cta-secondary` | `#FFFFFF` + 1px border | "View Docs" outline buttons |
| `font-marketing-display` | 44–56px / 700 / tight tracking | Landing-page hero headline, two-tone (black + blue span) |
| `font-marketing-eyebrow` | 11–12px / 600 / uppercase / letter-spaced | "THE PROBLEM", "TRUSTED BY SECURITY TEAMS AT", "HAPPENING NOW" |
| `pattern-dot-matrix` | halftone dot gradient graphic | Hero background illustration (mountain/wave built from dots), decorative, not text |
| `color-promo-card-bg` | soft gradient `#EAF2FF`→`#FBF3EC` | Edge "Happening Now" promo card background |

## Components (Addendum)

| Component | Variant | Props | Notes |
|---|---|---|---|
| `AIPanel.ReplySuggestion` | Prompt + generated draft | `userPrompt`, `generatedSubject`, `generatedBody`, `toneLabel` | User's quick-prompt renders as a right-aligned bubble; assistant reply renders as a full structured email draft (Subject: + greeting + body) the user can insert directly into the compose field. |
| `InlineEditor.CoachingPopover` | Anchored to selected text/paragraph | `categories: {label, description}[]`, `suggestions: {before, after, explanation}[]`, `footerActions` | Appears docked at the bottom of the compose body; left column lists coaching categories (Tone, Reader sentiment, Clarity) as a vertical nav; right column shows detail + before/after suggestion cards, each with an accept checkmark. Footer: "Apply N of N suggestions" (primary), "Discard", "Retry". |
| `SuggestionCard.BeforeAfter` | Diff-style | `originalPhrase` (bold strikthrough or quoted), `revisedPhrase` (bold), `rationale` | One card per writing suggestion; checkmark icon toggles accept/reject per-suggestion. |
| `Calendar.WeekView` | 7-day grid w/ hour rows | `dateRange`, `hourRows`, `events[]`, `currentTime` | Header shows date range ("Sept 13 – Sept 19, 2025") + live weather chip; hour gridlines every 60min (30min sub-line dashed); events are colored blocks positioned/sized by time. |
| `Calendar.DayView` (mobile) | Single-day hour grid | `date`, `hourRows`, `events[]` | Compact week-strip date picker across the top (Sun–Sat with selected day as filled circle) above a scrollable 24-hour column. |
| `EventDetailPopover` | Card overlay anchored to event block | `title`, `datetime`, `recurrence`, `organizer`, `rsvpStatus`, `location`, `conferenceLink`, `notes`, `attendees {accepted[], declined[], totalCount}` | Rich card: icon-prefixed rows (clock, person, pin, video-camera, notes, people); RSVP shown as accepted-state pill + "Edit RSVP" outline button; conferencing shows a solid "Join Teams Meeting" button; attendee avatars stack with "+N more" overflow, split into accepted/declined groups. |
| `AvatarStack.Overflow` | Horizontal overlapping circles | `avatars[]`, `overflowCount` | Used for meeting invitees; declined group rendered separately below accepted group. |
| `Modal.NewEvent` (mobile) | Bottom-anchored form sheet | `title`, `calendarPicker`, `fields: {people, allDayToggle, date, time, timezone, repeat, location, teamsToggle, description, attachments}` | Rounded card over dimmed calendar background; color dot next to title matches selected calendar; toggle switches for All Day / Teams Meeting; chevron rows drill into sub-pickers; top-right checkmark commits, top-left "X" cancels; keyboard docks at bottom. |
| `AppShell.MailClient.Mobile` | Single/split pane (tablet) | `folderNav?`, `focusedOtherTabs`, `groupedOtherSenders`, `messageList`, `emptyReadingPane` | Condensed header (hamburger + "Inbox" title + Mail/Calendar segmented control + search/bell icons); Focused/Other pill tabs; a collapsible **grouped row** for low-priority senders ("Other Emails — ChatGPT, Linear" with count badge) sits above the normal chronological list. |
| `MessageListItem.Grouped` | Summary row | `icon`, `groupLabel`, `senderNames`, `count` | Represents multiple low-signal senders collapsed into one tappable row instead of individual list items. |
| `Sidebar.AccountFolders` (mobile) | Slide-over panel | `accountName`, `accountEmail`, `snoozeIcon`, `folders: {icon, label, unreadCount}[]`, `footerActions {help, settings}` | Left rail of small circular account-switcher avatars; main panel lists standard folders (Inbox, Archive, Drafts, Sent, Deleted, Conversation History, Junk) each with a right-aligned unread-count chip. |
| `Dropdown.ViewSwitcher` | Anchored menu | `options: {icon,label}[]`, `selected` | Agenda / Day / Work Week / Week / Month; selected option shows a trailing checkmark and blue label/icon tint. |
| `Coachmark.SequencePill` (variant) | Same as `Tooltip.FeatureIntro` | `title`, `body`, `stepIndicator` | Confirms the 3-step onboarding sequence: step 1 "One Claude for your work" (Chat/Cowork choice) → step 2 "Everything is where you left it" → step 3 (not captured). Pointer nub attaches to the trigger icon above. |
| `MarketingSite.Hero` | Two-tone headline + illustration | `eyebrow?`, `headline (mixed-color spans)`, `subhead`, `primaryCta`, `secondaryCta`, `heroIllustration` | Large bold headline with select words tinted brand-blue; body subhead below at reduced weight/size; two CTAs (solid + outline) left-aligned; right/below area holds a generative dot-matrix "mountain/wave" illustration built from a color gradient. |
| `MarketingSite.LogoStrip` | Horizontal row | `eyebrowLabel`, `logos[]` | "Trusted by..." eyebrow label + grayscale/mono partner logo row. |
| `MarketingSite.NumberedFeatureList` | Vertical list | `items: {index, title, description, icon}[]` | Two-digit index ("01","02"...) + title + short description + small icon badge, divided by hairlines — used for "problem" / feature breakdown sections. |
| `MarketingSite.StepPanel` | Dark card list | `steps: {label, description, icon}[]` | Alternate feature-list treatment on dark/near-black rounded rows, each with a small icon-badge on the right. |
| `MarketingSite.TestimonialCard` | Compact quote card | `avatar`, `name`, `role`, `ratingStars`, `quote` | Small headshot + name/role + star rating, paired with a short quote card. |
| `Commerce.ProductCard` | Vertical, image-forward | `productImage`, `productName`, `description`, `primaryCta` | Large product photo on neutral card background, name + one-line description below, solid CTA button ("Comprar XBOX Series S"). Cards stack vertically on mobile width. |
| `NavBar.LinkRow` (commerce) | Top utility links | `links[]` | Simple centered text-link row above the product grid (e.g. "Compre o Microsoft 365", "Comprar XBOX", "Adquira o Windows 11" with a small icon). |
| `PromoCard.HappeningNow` | Editorial/app-store style promo | `eyebrow`, `heroCollage (stacked cards)`, `aiPromptExample`, `headline`, `subhead`, `appIcon`, `appName`, `appTagline`, `downloadAction` | Fanned stack of content-card mockups behind a floating "AI prompt" chip (tab-summary chips + example prompt text + send button) demonstrating an in-product AI feature; below, a store-style app row with icon/name/tagline + trailing download icon. |

## States and Interactions (Addendum)

| Element | State | Behavior |
|---|---|---|
| `AIPanel.ReplySuggestion` | Prompt submitted | User bubble appears immediately (optimistic), assistant drafts stream in below with a labeled "Subject:" line |
| `InlineEditor.CoachingPopover` | Suggestion accepted | Checkmark bullet fills solid; included in the "Apply N of N" count |
| `InlineEditor.CoachingPopover` | Apply pressed | Popover closes, accepted edits are inserted into the compose body inline |
| `InlineEditor.CoachingPopover` | Retry pressed | Regenerates suggestion set, categories list may reorder by relevance |
| `EventDetailPopover` | RSVP already accepted | Shows a filled/tinted "You accepted" row + outline "Edit RSVP" button (not the initial Accept/Decline/Tentative choice) |
| `EventDetailPopover` | Attendee list overflow | Shows first ~6 avatars + "+N more" as a tappable link that expands "See all N invitees" |
| `Modal.NewEvent` | All Day toggled on | Time range row hides/disables, only date fields remain |
| `Modal.NewEvent` | Teams Meeting toggled on | Auto-generates a join link, adds a conferencing row to the event once saved |
| `MessageListItem.Grouped` | Tapped | Expands into its own filtered list view of just those senders' messages (does not inline-expand in place) |
| `Sidebar.AccountFolders` | Folder selected | Highlights row (blue text + light-blue background), updates message list in the adjacent pane |
| `Dropdown.ViewSwitcher` | Option selected | Menu closes, calendar re-renders in the chosen density (Day/Week/Month), checkmark moves to new selection |
| `MarketingSite.Hero` primaryCta | Hover | Underline/opacity shift on outline button; solid button darkens ~8% |
| `Commerce.ProductCard` CTA | Tap | Navigates to PDP or adds to cart (context-dependent, not shown) |
| `PromoCard.HappeningNow` | AI prompt chip tap | (implied) triggers the summarization action shown in the example, replacing the placeholder tabs chip with a result |

## Responsive Behavior (Addendum)

| Breakpoint | Changes |
|---|---|
| Desktop (>1024px), Mail | Full 4-pane layout: folder rail, message list, reading pane, AI panel — as in original spec |
| Tablet landscape (iPad width, ~1024–1200px), Mail | Collapses to hamburger-triggered folder sidebar (overlay, not persistent column); Focused/Other tabs remain; AI panel becomes a full previous-screen replacement rather than a 4th column when opened |
| Tablet landscape, Calendar | Week view keeps all 7 day columns; event-detail opens as an anchored popover rather than a modal |
| Mobile/narrow tablet portrait, Calendar | Switches to single `Calendar.DayView` with a horizontal 7-day date strip for switching days, plus a `Dropdown.ViewSwitcher` to jump to Agenda/Week/Month |
| Mobile, New Event | Form renders as a near-full-screen bottom sheet with on-screen keyboard docked, fields stack in cards rather than a 2-column layout |
| Marketing sites (Guardbase/Dataguard) | Hero CTA pair and nav collapse to stacked buttons + hamburger below ~768px; numbered feature list and stat cards stack to single column; dot-matrix hero illustration scales/crops rather than reflowing |

## Edge Cases (Addendum)

- **AI reply draft too long for panel height**: panel scrolls internally; footer input stays pinned.
- **Coaching popover with zero suggestions**: hide category rows with no issues found rather than showing an empty detail pane; "Apply" button reflects only categories with actionable items.
- **Event with no location / no conferencing**: omit those rows entirely rather than showing empty icons.
- **Event with very high attendee count (67 invitees, as shown)**: always summarize as "accepted / declined" counts with avatar overflow — never render all avatars inline.
- **Grouped "Other Emails" row with only 1 low-priority sender**: consider still grouping if the sender is a known low-priority category (e.g. automated senders), but a single unique sender may instead surface as a normal row — flag for product decision.
- **New Event form on very short viewport**: fields must remain reachable above the keyboard; sheet should scroll internally rather than get obscured.
- **Marketing hero on very narrow viewport**: two-tone headline must still wrap sensibly without color-span breaking mid-word.
- **Commerce product card with missing localized CTA text**: fallback to a generic "Buy now" style string rather than leaving the button blank (source screenshot is in pt-BR — copy must be locale-driven, not hardcoded).

## Animation / Motion (Addendum)

| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| `EventDetailPopover` | Event tap | Scale + fade in anchored at event block, small drop shadow grows | 150–200ms | ease-out |
| `InlineEditor.CoachingPopover` | Suggestion accepted | Checkmark fill + subtle bounce | 120ms | spring/ease-out |
| `Modal.NewEvent` | Open | Slide up from bottom edge, backdrop dims | 250ms | ease-out |
| `Dropdown.ViewSwitcher` | Open/close | Fade + scale from anchor icon | 150ms | ease-out |
| `MessageListItem.Grouped` | Expand tap | Cross-fade from grouped row into filtered list screen | 200ms | ease-in-out |
| `MarketingSite.Hero` illustration | Scroll-into-view | Dot-matrix gradient sweeps in / fades up | 400–600ms | ease-out, once per view |
| `PromoCard.HappeningNow` collage | Idle/auto | Slight parallax drift of the fanned background cards behind the foreground phone mock | continuous, slow | linear |

## Accessibility Notes (Addendum)

- `AIPanel.ReplySuggestion` and `InlineEditor.CoachingPopover`: both must expose generated content via `aria-live="polite"`; per-suggestion accept controls need explicit labels ("Accept suggestion: use 'experienced and versatile Design professional'") rather than a bare checkmark icon.
- `EventDetailPopover`: RSVP state ("You accepted") should be announced as status text, not just a colored pill; "Edit RSVP" must be independently focusable and clearly labeled with the event name for screen-reader context (avoid ambiguous "Edit RSVP" with no event association when multiple popovers could theoretically exist).
- `Modal.NewEvent`: all toggle switches (All Day, Teams Meeting) need `role="switch"` + `aria-checked`; chevron rows (Time Zone, Repeat, Location) need to announce their current value, not just the label ("Repeat, None").
- `MessageListItem.Grouped`: needs an accessible name summarizing the group ("Other Emails, 3 unread, from ChatGPT and Linear") so it isn't announced as a single ambiguous row.
- `Sidebar.AccountFolders`: unread-count badges need `aria-label` (e.g. "Inbox, 27 unread") rather than relying on a visually-adjacent number.
- `MarketingSite.Hero`: two-tone headline coloring is decorative — ensure the full headline reads as one coherent sentence to assistive tech (no separate `<span>`-per-color creating awkward pause points), and CTA buttons need distinct accessible names beyond icon-only arrows ("Watch demo", "View docs").
- `Commerce.ProductCard`: product image needs descriptive alt text (product name + key attribute), not decorative/empty alt, since the image is the primary identifier in the card.
