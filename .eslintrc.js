module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:sonarjs/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'sonarjs', 'unused-imports'],
  root: true,
  rules: {
    'import/no-unresolved': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'all',
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '@nestjs/**',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['nestjs'],
      },
    ],
    'max-lines-per-function': ['error', { skipBlankLines: true, max: 75 }],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-return-await': 'error',
    'no-fallthrough': 'warn',
    'no-useless-return': 'error',
    'object-shorthand': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'never',
        next: 'if',
        prev: 'if',
      },
      {
        blankLine: 'always',
        next: ['block-like', 'const', 'export', 'let', 'return', 'throw'],
        prev: '*',
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['block-like', 'const', 'let'],
      },
      {
        blankLine: 'never',
        next: 'const',
        prev: 'const',
      },
      {
        blankLine: 'never',
        next: 'let',
        prev: 'let',
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['multiline-const', 'multiline-let'],
      },
    ],
    'prefer-const': 'error',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    yoda: 'error',
    'sonarjs/no-duplicate-string': 'off',
    'no-return-await': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['.'],
      },
    },
  },
};
