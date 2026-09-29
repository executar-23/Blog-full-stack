## Setup — wrap every screen in `BlogProvider`

Every design must be wrapped once, at the root, in `BlogProvider` (from `@blog/design-system`). It renders Fluent UI v9's `FluentProvider` with the theme `blogLightTheme`, plus `SSRProvider` and the `--blog-*` CSS custom properties (via an injected `<style>` tag). Without it: no theme tokens resolve, Fluent components (like the `Button` inside `CodeChip`) fall back to browser defaults, and every `var(--blog-*)` reference is empty.

```tsx
import { BlogProvider } from '@blog/design-system';

export default function App() {
  return <BlogProvider>{/* your screen */}</BlogProvider>;
}
```

`lang` is an optional BCP 47 tag prop; `renderer` is SSR-only (server-side Griffel style collection) and never needed in a client-rendered design.

## Styling idiom — CSS-in-JS (Griffel), never className strings

This design system has **no utility classes to author** — every component styles itself internally via Griffel (`makeStyles`) reading Fluent theme tokens that `BlogProvider` sets. When composing your own layout around the shipped components, do not invent class names; use the `--blog-*` CSS custom properties `BlogProvider` exposes, always through `var(--blog-<group>-<name>)`:

| Family     | Example variables                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Color      | `--blog-color-text-primary`, `--blog-color-text-secondary`, `--blog-color-surface`, `--blog-color-surface-muted`, `--blog-color-border` |
| Spacing    | `--blog-spacing-<name>` (px values)                                                                                                     |
| Radius     | `--blog-radius-<name>`                                                                                                                  |
| Typography | `--blog-font-<name>`, `--blog-font-family-<name>`                                                                                       |
| Motion     | `--blog-motion-<name>`                                                                                                                  |
| Breakpoint | `--blog-breakpoint-<name>`                                                                                                              |

Reduced-motion-aware tokens (motion/gradient) ship a `-reduced` variant pair automatically handled by the tokens package — reference the base name; do not branch on `prefers-reduced-motion` yourself.

## Where the truth lives

- No static token file is synced (this DS defines tokens as TypeScript objects in `@blog/tokens`, not a compiled tokens file) — the `--blog-*` variables above are injected at runtime by `BlogProvider` itself; trust the family table above for the vocabulary.
- `_ds/components/components/CodeChip/CodeChip.d.ts` — the only synced component's prop contract today.
- `_ds/README.md` — generated component index.

## Build example

```tsx
import { BlogProvider, CodeChip } from '@blog/design-system';

<BlogProvider>
  <CodeChip value="482913" copyLabel="Copiar código" copiedLabel="Copiado" />
</BlogProvider>;
```

For your own layout glue (spacing/alignment around shipped components), use plain CSS with the `--blog-*` variables above, e.g. `style={{ padding: 'var(--blog-spacing-md)', color: 'var(--blog-color-text-secondary)' }}` — never hardcode a color or spacing literal.

## Scope note

Only `CodeChip` is synced today — it is the only component in `@blog/design-system` with Storybook stories. The other nine exported components (`CardLink`, `Hero`, `EditorialCard`, `CollectionTile`, `ProductCard`, `ProductListRow`, `FilterChipGroup`, `SectionTabs`, `EmptyState`) exist in the package but have no stories yet, so this sync's converter (which builds previews from stories) cannot include them. They will appear on a future re-sync once stories are added.
