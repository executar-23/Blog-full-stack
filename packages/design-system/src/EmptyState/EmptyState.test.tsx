import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('announces the message via a status region', () => {
    render(
      <BlogProvider>
        <EmptyState title="Sem resultados" description="Tente outro nome ou categoria." />
      </BlogProvider>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Sem resultados');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <BlogProvider>
        <EmptyState title="Sem resultados" description="Tente outro nome ou categoria." />
      </BlogProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
