import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier/recommended';
import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import { dirname } from 'path';
import ts from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config} */
const eslintConfig = ts.config([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['node_modules', 'dist', '.next'] },
  {
    plugins: {
      jsxA11y: jsxA11y.flatConfigs.recommended,
    },
  },
  { languageOptions: { globals: globals.browser } },
  ...tailwind.configs['flat/recommended'],
  js.configs.recommended,
  ts.configs.eslintRecommended,
  prettier,

  {
    rules: {
      'no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ], // For JavaScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ], // For TypeScript

      'prettier/prettier': 'error',
    },
  },
]);

export default eslintConfig;
