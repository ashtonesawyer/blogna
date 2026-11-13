import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Variables
      'no-var': 'error',
      'prefer-const': 'error',

      // Objects and arrays
      'no-array-constructor': 'error',
      'dot-notation': 'error',
      'object-shorthand': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
      ],
      'prefer-spread': 'error',
      'prefer-object-spread': 'error',

      // Strings and functions
      'no-eval': 'error',
      'no-new-func': 'error',
      'prefer-template': 'error',
      'no-param-reassign': 'error',
      'func-style': ['error', 'expression'],
      'func-names': ['error', 'always'],
      'no-loop-func': 'error',
      'default-param-last': 'error',
      'prefer-arrow-callback': 'error',

      // Comparisons and best practices
      eqeqeq: ['error', 'always'],
      'no-nested-ternary': 'error',
      'no-multi-assign': 'error',
      'no-new-wrappers': 'error',
      'no-else-return': 'error',
      'no-duplicate-imports': 'error',
      'prefer-exponentiation-operator': 'error',
      'no-unneeded-ternary': 'error',

      // Naming conventions
      camelcase: 'error',
      'new-cap': 'error',
      'no-underscore-dangle': 'error',
    },
  },
]);
