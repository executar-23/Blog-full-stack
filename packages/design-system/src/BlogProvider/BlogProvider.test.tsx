import { render, screen } from '@testing-library/react';
import { BlogProvider, createBlogRenderer } from './BlogProvider';

describe('BlogProvider', () => {
  it('applies the Fluent theme built from @blog/tokens', () => {
    render(
      <BlogProvider renderer={createBlogRenderer()}>
        <p>content</p>
      </BlogProvider>,
    );
    const provider = screen.getByText('content').closest('.fui-FluentProvider');
    expect(provider).not.toBeNull();
  });

  it('declares the --blog-* custom properties', () => {
    render(
      <BlogProvider>
        <p>content</p>
      </BlogProvider>,
    );
    const css = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('');
    expect(css).toContain('--blog-color-primary-blue:#0A63C9');
  });
});
