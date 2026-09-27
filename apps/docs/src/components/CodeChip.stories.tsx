import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeChip } from '@blog/design-system';

const meta = {
  title: 'Components/CodeChip',
  component: CodeChip,
  args: {
    value: '482913',
    copyLabel: 'Copiar código',
    copiedLabel: 'Copiado',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente de referência (handoff: `CodeChip`): monospace, fundo `color-surface-muted`, `radius-sm`, ação de cópia visível e acessível por teclado, confirmação inline anunciada via `aria-live`.',
      },
    },
  },
} satisfies Meta<typeof CodeChip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expired: Story = {
  args: { expired: true },
};
