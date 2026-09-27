import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BlogProvider } from '../BlogProvider';
import { CodeChip } from './CodeChip';

function setup(props: Partial<Parameters<typeof CodeChip>[0]> = {}) {
  return render(
    <BlogProvider>
      <CodeChip value="482913" copyLabel="Copy code" copiedLabel="Copied" {...props} />
    </BlogProvider>,
  );
}

describe('CodeChip', () => {
  let writeText: jest.Mock;

  beforeEach(() => {
    writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  });

  it('renders the code and a keyboard-reachable copy action', () => {
    setup();
    expect(screen.getByText('482913').tagName).toBe('CODE');
    const button = screen.getByRole('button', { name: 'Copy code' });
    button.focus();
    expect(button).toHaveFocus();
  });

  it('copies the value and announces the confirmation', async () => {
    const onCopy = jest.fn();
    setup({ onCopy });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    });
    expect(writeText).toHaveBeenCalledWith('482913');
    expect(onCopy).toHaveBeenCalledWith('482913');
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
  });

  it('keeps the code visible and reports clipboard failures', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    const onCopyError = jest.fn();
    setup({ onCopyError });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    });
    expect(onCopyError).toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('');
    expect(screen.getByText('482913')).toBeInTheDocument();
  });

  it('disables copying when expired', () => {
    setup({ expired: true });
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });
});
