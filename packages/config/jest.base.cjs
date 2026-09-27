// Shared Jest configuration (ADR-003): TypeScript via @swc/jest.
const path = require('node:path');

/**
 * @param {{ rootDir: string, environment?: 'node' | 'jsdom' }} options
 * @returns {import('jest').Config}
 */
function createJestConfig({ rootDir, environment = 'node' }) {
  return {
    rootDir,
    testEnvironment: environment,
    testMatch: ['<rootDir>/src/**/*.test.ts?(x)', '<rootDir>/tests/**/*.test.ts?(x)'],
    transform: {
      '^.+\\.(t|j)sx?$': [
        '@swc/jest',
        {
          jsc: {
            parser: { syntax: 'typescript', tsx: true },
            transform: { react: { runtime: 'automatic' } },
            target: 'es2022',
          },
          module: { type: 'commonjs' },
        },
      ],
    },
    transformIgnorePatterns: ['/node_modules/(?!(@fluentui|@griffel)/)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFilesAfterEnv: environment === 'jsdom' ? [path.join(__dirname, 'jest.setup.dom.cjs')] : [],
  };
}

module.exports = { createJestConfig };
