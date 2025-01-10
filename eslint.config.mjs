import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier/recommended';
import tailwind from 'eslint-plugin-tailwindcss';
import { dirname } from 'path';
import ts from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['node_modules', 'dist', '.next'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tailwind.configs['flat/recommended'],
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    plugins: {
      jsxA11y: jsxA11y.flatConfigs.recommended,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
