import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import sonarjsPlugin from 'eslint-plugin-sonarjs'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import eslintReact from '@eslint-react/eslint-plugin'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjsPlugin.configs.recommended,
  eslintReact.configs['recommended-typescript'],
  prettierPlugin,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-magic-numbers': ['error', { ignore: [0, 1, -1, 404] }],
      'no-return-await': 'error',
      'no-implicit-coercion': 'error',
      'sonarjs/cognitive-complexity': ['error', 15],
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: [
      'dist/**',
      'build/**',
      'coverage/**',
      '.sonar/**',
      '.scannerwork/**',
      'src/__generated__/**',
      'eslint.config.js',
    ],
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'no-magic-numbers': 'off',
      'sonarjs/no-hardcoded-credentials': 'off',
      'sonarjs/no-hardcoded-passwords': 'off',
    },
  },
  {
    files: ['src/shared/lib/hooks/useViewModel.ts'],
    rules: {
      '@eslint-react/rules-of-hooks': 'off',
    },
  },
]
