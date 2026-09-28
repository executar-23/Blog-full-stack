import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { FilterChipGroup } from './FilterChipGroup';

const chips = [
  { value: 'all', label: 'Todos' },
  { value: 'produtividade', label: 'Produtividade' },
];

function setup(active = 'all') {
  const onChange = jest.fn();
  const utils = render(
    <BlogProvider>
      <FilterChipGroup
        chips={chips}
        active={active}
        onChange={onChange}
        ariaLabel="Filtrar produtos"
      />
    </BlogProvider>,
  );
  return { onChange, ...utils };
}

describe('FilterChipGroup', () => {
  it('marks the active chip as pressed and reports clicks on the others', () => {
    const { onChange } = setup();
    expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'true');
    const produtividade = screen.getByRole('button', { name: 'Produtividade' });
    expect(produtividade).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(produtividade);
    expect(onChange).toHaveBeenCalledWith('produtividade');
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
