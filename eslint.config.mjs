import parser from '@typescript-eslint/parser';
import eslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    rules: {},
  },
  {
    files: ['cypress/e2e/**/*.ts', 'cypress/support/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
