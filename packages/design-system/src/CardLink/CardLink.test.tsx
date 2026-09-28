import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { CardLink } from './CardLink';

describe('CardLink', () => {
  it('renders as a keyboard-reachable link by default', () => {
    render(
      <BlogProvider>
        <CardLink href="/loja/exemplo">Ver produto</CardLink>
      </BlogProvider>,
    );
    const link = screen.getByRole('link', { name: 'Ver produto' });
    expect(link).toHaveAttribute('href', '/loja/exemplo');
    link.focus();
    expect(link).toHaveFocus();
  });

  it('renders as a different element via the `as` prop', () => {
    render(
      <BlogProvider>
        <CardLink as="button" type="button">
          Selecionar
        </CardLink>
      </BlogProvider>,
    );
    expect(screen.getByRole('button', { name: 'Selecionar' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <BlogProvider>
        <CardLink href="/loja/exemplo">Ver produto</CardLink>
      </BlogProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
