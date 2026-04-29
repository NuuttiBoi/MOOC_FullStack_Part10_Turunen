// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const pluginJest = require('eslint-plugin-jest');


module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-duplicate-imports': 'error',
      'no-useless-return': 'warn',
      indent: ['error', 2, { SwitchCase: 1 }],
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    ...pluginJest.configs['flat/recommended'],
  },
]);
