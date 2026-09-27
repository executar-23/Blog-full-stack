import type { Preview } from '@storybook/react-vite';
import { BlogProvider } from '@blog/design-system';

const preview: Preview = {
  decorators: [
    (Story) => (
      <BlogProvider lang="pt-BR">
        <Story />
      </BlogProvider>
    ),
  ],
  parameters: {
    a11y: { test: 'error' },
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default preview;
