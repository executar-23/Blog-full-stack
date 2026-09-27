/**
 * Font families (gap IG1): the identity names only "system sans" and
 * "monospace" without a family. These stacks resolve to the platform system
 * fonts; no font file is downloaded or bundled.
 */
export const fontFamilies = {
  sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
} as const;
