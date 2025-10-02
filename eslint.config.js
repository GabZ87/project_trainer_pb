module.exports = [
  {
    files: ['cypress/e2e/**/*.ts', 'cypress/support/**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
