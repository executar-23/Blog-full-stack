import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { ProductCard } from './ProductCard';

function setup(props: Partial<Parameters<typeof ProductCard>[0]> = {}) {
  return render(
    <BlogProvider>
      <ProductCard
        icon="A"
        title="Produto de exemplo A"
        description="Produtividade · exemplo"
        ctaLabel="Ver"
        href="/loja#buscar"
        {...props}
      />
    </BlogProvider>,
  );
}

describe('ProductCard', () => {
  it('exposes the product name and action in the accessible name', () => {
    setup();
    expect(screen.getByRole('link', { name: 'Produto de exemplo A, Ver' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
