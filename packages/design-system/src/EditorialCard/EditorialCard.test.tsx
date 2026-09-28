import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { EditorialCard } from './EditorialCard';

function setup(props: Partial<Parameters<typeof EditorialCard>[0]> = {}) {
  return render(
    <BlogProvider>
      <EditorialCard
        eyebrow="Editorial"
        title="Uma seleção para começar"
        description="Conteúdo editorial de exemplo."
        href="/blog/artigos"
        mediaIndex="01"
        mediaLabel="Imagem de exemplo"
        ariaLabel="Uma seleção para começar"
        {...props}
      />
    </BlogProvider>,
  );
}

describe('EditorialCard', () => {
  it('links to a real route, never an invented article slug', () => {
    setup();
    expect(screen.getByRole('link', { name: 'Uma seleção para começar' })).toHaveAttribute(
      'href',
      '/blog/artigos',
    );
  });

  it('renders the split layout for the large spotlight variant', () => {
    setup({ layout: 'split', title: 'Um olhar mais próximo sobre a seleção' });
    expect(
      screen.getByRole('heading', { name: 'Um olhar mais próximo sobre a seleção' }),
    ).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
