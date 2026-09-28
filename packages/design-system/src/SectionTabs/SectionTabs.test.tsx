import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { SectionTabs } from './SectionTabs';

const tabs = [
  { value: 'hoje', label: 'Destaques', icon: '▣' },
  { value: 'explorar', label: 'Explorar', icon: '◫' },
  { value: 'buscar', label: 'Buscar', icon: '⌕' },
];

function setup(selectedValue = 'hoje') {
  const onSelect = jest.fn();
  const utils = render(
    <BlogProvider>
      <SectionTabs
        tabs={tabs}
        selectedValue={selectedValue}
        onSelect={onSelect}
        ariaLabel="Seções da Loja"
      />
    </BlogProvider>,
  );
  return { onSelect, ...utils };
}

describe('SectionTabs', () => {
  it('exposes one tablist with the active tab selected', () => {
    setup();
    expect(screen.getByRole('tablist', { name: 'Seções da Loja' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Destaques' })).toHaveAttribute('aria-selected', 'true');
  });

  it('reports selection changes', () => {
    const { onSelect } = setup();
    fireEvent.click(screen.getByRole('tab', { name: 'Explorar' }));
    expect(onSelect).toHaveBeenCalledWith('explorar');
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
