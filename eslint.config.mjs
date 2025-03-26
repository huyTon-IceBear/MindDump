import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['**/node_modules/*', '**/out/*', '**/.next/*', '**/coverage', 'src/styles/globals.css', '.lintstagedrc.js'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': [
        1,
        {
          allow: ['warn', 'error'],
        },
      ],
      '@typescript-eslint/no-unused-expressions': 1,
      '@typescript-eslint/no-explicit-any': 1,
    },
  },
]

export default eslintConfig
