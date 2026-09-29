# design-sync notes — @blog/design-system

## Status: BLOCKED on first sync

## Repo facts

- Storybook lives at `apps/docs/.storybook`, package `apps/docs`.
- Only **1 of 10** design-system components has stories: `CodeChip`
  (`apps/docs/src/components/CodeChip.stories.tsx`). The other nine
  (BlogProvider, CardLink, CollectionTile, EditorialCard, EmptyState,
  FilterChipGroup, Hero, ProductCard, ProductListRow, SectionTabs) have
  `.test.tsx` unit tests only — no stories — per the README: "Os demais
  componentes serão derivados dos wireframes (G5)." They will not appear
  in a storybook-shape sync until they get stories.
- `apps/docs/src/foundations/Foundations.stories.tsx` has title "Identity"
  (non-component doc page) — correctly dropped via `[TITLE_UNMAPPED]`, no
  action needed.

## [GENERAL] fix applied

- `packages/design-system/package.json` had no top-level `types` field
  (only `exports['.'].types` pointing at `./src/index.ts`). The converter's
  `findTypesRoot`/`projectFor` only reads `pkgJson.types`/`typings`, so it
  fell through to `packages/design-system/index.d.ts` (doesn't exist) and
  found 0 exports. **Fix**: added `"types": "./dist/index.d.ts"` to
  `packages/design-system/package.json`. Harmless — `exports` still wins
  for real consumers; this only helps tools that read the legacy field.

## Hard blocker — do not work around without discussing with the user

`package-validate.mjs`'s `[BUNDLE_EXPORT]` smoke check fails:
`CodeChip` is not a function on `window.BlogDesignSystem` once the bundle
evaluates in the browser. Root cause (confirmed via `.render-check.json`):

```
[SCHEDULER_MISSING] this DS's dist/ imports 'scheduler' directly —
usually react-dom leaked into the dist. Check the DS build's externals.
```

This is a **false positive** for this repo. The real source is
`node_modules/@fluentui/react-context-selector/lib/createContext.js`:

```js
import {
  unstable_NormalPriority as NormalPriority,
  unstable_runWithPriority as runWithPriority,
} from 'scheduler';
```

`@fluentui/react-context-selector` is a real, first-class dependency of
Fluent UI v9's `FluentProvider`/theme context (used by `BlogProvider`) —
it legitimately imports the standalone `scheduler` package for priority
scheduling, unrelated to any react-dom leak. `.ds-sync/lib/bundle.mjs`
unconditionally redirects **every** `scheduler` import to a shim that
`throw`s, on the assumption that a DS dist should never import it
directly. That throw happens at bundle-evaluation time, before the final
`window.BlogDesignSystem = …` assignment runs, so the whole export map is
lost — not just the CodeChip-scheduler chain.

There is **no config override** for this (`cfg.storyImports.shim/bundle`
only apply to story-file import resolution, not the main dist bundle's
`reactShim` plugin), and the skill's own escape-hatch table explicitly
forbids forking `bundle.mjs` ("app-contract surface — never fork them").

Patching `@fluentui/react-context-selector` itself (e.g. via `yarn patch`)
was considered and rejected: it would ship altered third-party code
instead of the design system's real, compiled behavior — against this
skill's "ship what the customer already built" principle.

**This blocks producing any working bundle** — CodeChip is currently the
_only_ storied component, and it (transitively, via `BlogProvider`) pulls
in `@fluentui/react-components` → `@fluentui/react-context-selector`.

## Re-sync risks / open questions for the user

- Needs a fix in the design-sync converter itself (a cfg knob to
  allowlist real `scheduler` imports, or to skip the shim when the
  resolved specifier isn't inside `react-dom`), which this session cannot
  make (`bundle.mjs` is off-limits).
- Once unblocked, note the design system currently ships only one
  storied, syncable component; the rest need stories authored first to
  be part of any future storybook-shape sync.
