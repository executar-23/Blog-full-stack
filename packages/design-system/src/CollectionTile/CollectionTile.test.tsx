import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { CollectionTile } from './CollectionTile';

function setup(props: Partial<Parameters<typeof CollectionTile>[0]> = {}) {
  return render(
    <BlogProvider>
      <CollectionTile
        eyebrow="Coleção de exemplo 01"
        title="Ferramentas para o cotidiano"
        meta="Explorar coleção →"
        href="/loja#explorar"
        {...props}
      />
    </BlogProvider>,
  );
}

describe('CollectionTile', () => {
  it('renders as an accessible link with the collection title', () => {
    setup();
    expect(screen.getByRole('link', { name: /Ferramentas para o cotidiano/ })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
