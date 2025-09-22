export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      // Example: 'semi': ['error', 'always']
    },
  },
];
