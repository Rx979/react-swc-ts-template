import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default tsEslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tsEslint.configs.recommendedTypeChecked,
      ...tsEslint.configs.stylisticTypeChecked
    ],
    settings: {
      react: {
        version: '18.3'
      }
    },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      '@stylistic/js': stylisticJs
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'semi': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
      'quotes': ['error', 'single'],
      '@stylistic/js/arrow-spacing': ['error', {'before': true, 'after': true}],
      '@stylistic/js/keyword-spacing': ['error', {'before': true, 'after': true}],
      '@stylistic/js/array-bracket-newline': ['error', {'multiline': true, 'minItems': 3}],
      'no-console': ['warn'],
      'no-debugger': ['error'],
      'no-alert': ['error'],
      'eqeqeq': ['error', 'always'],
      'consistent-return': ['error'],
      'curly': ['error', 'all'],
      'prefer-const': ['error'],
      'no-var': ['error'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-implicit-coercion': ['error', { 'boolean': true, 'number': true, 'string': true }],
      'no-trailing-spaces': ['error']
    },
  },
)
