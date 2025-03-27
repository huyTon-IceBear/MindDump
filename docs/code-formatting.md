# 💄 Code Formatting & Styling

## Overview

Maintaining consistent code quality is essential in any project. This setup helps enforce best practices automatically using the following tools:

- **Husky** – Ensures that pre-commit and pre-push hooks run checks before code reaches the repository.
- **Lint-Staged** – Optimizes performance by running linters only on staged files instead of the entire codebase.
- **ESLint** – Catches syntax errors and enforces best practices in JavaScript/TypeScript.
- **Prettier** – Enforces consistent code formatting, preventing unnecessary diffs in pull requests.

## Installation & Setup

### 1. Prettier

- The **`.prettierrc`** file contains common, preferred rules for formatting.
- The **`.prettierignore`** file is used to exclude certain files and folders from being formatted (e.g., `node_modules`, `.git`, etc.).
- By default, Prettier ignores files in version control system directories such as `.git`, `.svn`, `.hg`, and `node_modules`.

### 2. ESLint

- The ESLint configuration is defined in the [eslint configuration file](../eslint.config.mjs).
- The setup follows the official [Next.js ESLint plugin configuration](https://nextjs.org/docs/app/api-reference/config/eslint), using the latest recommended setup.
- If you're using a legacy ESLint configuration file like **`.eslintrc.js`**, refer to the [deprecated ESLint configuration documentation](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated).
- Since `eslint-config-next` already includes the rule sets from plugins such as `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-next`, you don’t need to add them separately.
- To avoid conflicts between ESLint and Prettier, the configuration includes `eslint-config-prettier`, ensuring both tools work together seamlessly.
- A plugin for sorting imports is also included to enforce structured and consistent import statements.
- To modify or disable any rules from the supported plugins (`react`, `react-hooks`, `next`), adjust the `rules` property in the ESLint configuration file.

### 3. Husky & Lint-Staged

- **Lint-Staged** is configured in the **`.lintstagedrc.js`** file to run ESLint on staged Git files before committing.
- **Husky** is used to enforce Git hooks, ensuring that Lint-Staged runs before commits are made.

## Usage

The project includes the following scripts in the `package.json` file:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "eslint:format": "eslint src --fix",
  "test": "jest",
  "test:watch": "jest --watch",
  "prepare": "husky"
}
```

To run code quality checks and formatting, use the following commands:

```bash
# Run ESLint checks
npm run lint

# Automatically fix ESLint errors
npm run eslint:format

# Run Jest tests
npm run test

# Watch mode for Jest tests
npm run test:watch
```

Husky ensures that `lint-staged` runs before commits to prevent committing poorly formatted code.

## References

For further details, check the official documentation:

1. [Prettier Documentation](https://prettier.io/docs/)
2. [ESLint Documentation](https://eslint.org/docs/latest/)
3. [Integrating Prettier with ESLint](https://prettier.io/docs/integrating-with-linters)
4. [Next.js ESLint Configuration](https://nextjs.org/docs/app/api-reference/config/eslint)
5. [Lint-Staged Repository](https://github.com/lint-staged/lint-staged)
6. [Husky Documentation](https://typicode.github.io/husky/)

This setup ensures a streamlined development workflow while maintaining code consistency across your project. Feel free to modify these configurations to fit your project’s needs!
