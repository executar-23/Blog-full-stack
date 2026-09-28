import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { Hero } from './Hero';

function setup(props: Partial<Parameters<typeof Hero>[0]> = {}) {
  return render(
    <BlogProvider>
      <Hero
        eyebrow="Destaque · exemplo"
        heading="Produto de exemplo A"
        description="Texto ilustrativo do destaque."
        ctaLabel="Ver produto"
        href="/loja#explorar"
        identityLabel="Produto de exemplo A"
        identityInitial="A"
        mediaLabel="Mídia do destaque"
        ariaLabel="Destaque: Produto de exemplo A"
        {...props}
      />
    </BlogProvider>,
  );
}

describe('Hero', () => {
  it('renders heading and description as a single accessible link', () => {
    setup();
    const link = screen.getByRole('link', { name: 'Destaque: Produto de exemplo A' });
    expect(link).toHaveAttribute('href', '/loja#explorar');
    expect(screen.getByRole('heading', { name: 'Produto de exemplo A' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
