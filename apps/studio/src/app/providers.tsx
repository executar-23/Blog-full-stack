'use client';

import { useState, type ReactNode } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { BlogProvider, createBlogRenderer, renderToStyleElements } from '@blog/design-system';

export function Providers({ children }: { children: ReactNode }) {
  const [renderer] = useState(() => createBlogRenderer());
  useServerInsertedHTML(() => <>{renderToStyleElements(renderer)}</>);
  return (
    <BlogProvider renderer={renderer} lang="pt-BR">
      {children}
    </BlogProvider>
  );
}
