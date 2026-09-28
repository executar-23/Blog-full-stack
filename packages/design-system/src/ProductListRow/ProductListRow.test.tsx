import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { ProductList, ProductListRow } from './ProductListRow';

function setup() {
  return render(
    <BlogProvider>
      <ProductList aria-label="Selecionados para você">
        <ProductListRow
          icon="A"
          title="Produto de exemplo A"
          description="Categoria de exemplo"
          ctaLabel="Ver"
          href="/loja#buscar"
        />
        <ProductListRow
          icon="B"
          title="Produto de exemplo B"
          description="Categoria de exemplo"
          ctaLabel="Obter"
          href="/loja#buscar"
        />
      </ProductList>
    </BlogProvider>,
  );
}

describe('ProductListRow', () => {
  it('renders each row as an accessible link with icon, title and action', () => {
    setup();
    expect(screen.getByRole('link', { name: 'Produto de exemplo A, Ver' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Produto de exemplo B, Obter' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
