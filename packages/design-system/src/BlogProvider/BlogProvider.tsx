'use client';

import type { ReactNode } from 'react';
import {
  FluentProvider,
  RendererProvider,
  SSRProvider,
  createDOMRenderer,
  type GriffelRenderer,
} from '@fluentui/react-components';
import { blogCssText, blogLightTheme } from '@blog/tokens';

export interface BlogProviderProps {
  children: ReactNode;
  /**
   * Griffel renderer. Pass the same instance used to collect styles on the
   * server (see `createBlogRenderer`) so SSR output and hydration match.
   */
  renderer?: GriffelRenderer;
  /** BCP 47 language tag of the rendered content. */
  lang?: string;
}

/** Creates a Griffel renderer; call once per request on the server. */
export function createBlogRenderer(): GriffelRenderer {
  return createDOMRenderer();
}

/**
 * Root provider of the design system: Fluent theme built from @blog/tokens,
 * Griffel renderer for SSR and the `--blog-*` CSS custom properties.
 */
export function BlogProvider({ children, renderer, lang }: BlogProviderProps) {
  const content = (
    <SSRProvider>
      <FluentProvider theme={blogLightTheme} {...(lang ? { lang } : {})}>
        <style href="blog-tokens" precedence="default">
          {blogCssText}
        </style>
        {children}
      </FluentProvider>
    </SSRProvider>
  );

  return renderer ? <RendererProvider renderer={renderer}>{content}</RendererProvider> : content;
}
