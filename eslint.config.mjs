// @ts-check
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const ignores = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.next/**',
  '**/.open-next/**',
  '**/.wrangler/**',
  '**/storybook-static/**',
  '**/coverage/**',
  '**/next-env.d.ts',
  '.yarn/**',
  '.nx/**',
  'docs/sources/**',
];

/**
 * Styling rules (ADR-001):
 * - only Griffel is allowed as styling solution;
 * - visual literals (hex colors, px, ms) are forbidden outside packages/tokens.
 */
const forbiddenStylingImports = {
  paths: [
    { name: 'styled-components', message: 'ADR-001: use Griffel (makeStyles).' },
    { name: 'tailwindcss', message: 'ADR-001: use Griffel (makeStyles).' },
  ],
  patterns: [{ group: ['@emotion/*'], message: 'ADR-001: use Griffel (makeStyles).' }],
};

const visualLiteralSelectors = [
  {
    selector: 'Literal[value=/#[0-9a-fA-F]{3,8}\\b/]',
    message: 'Visual literal: use a token from @blog/tokens (ADR-001).',
  },
  {
    selector: 'Literal[value=/\\b\\d+(\\.\\d+)?(px|ms)\\b/]',
    message: 'Visual literal: use a token from @blog/tokens (ADR-001).',
  },
  {
    selector: 'TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b|\\b\\d+(\\.\\d+)?(px|ms)\\b/]',
    message: 'Visual literal: use a token from @blog/tokens (ADR-001).',
  },
];

export default tseslint.config(
  { ignores },
  ...tseslint.configs.strict,
  {
    rules: {
      'no-restricted-imports': ['error', forbiddenStylingImports],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'writable',
        __dirname: 'readonly',
        expect: 'readonly',
      },
    },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    files: ['packages/design-system/src/**/*.{ts,tsx}', 'apps/*/src/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error', ...visualLiteralSelectors],
    },
  },
  prettier,
);
