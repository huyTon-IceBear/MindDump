# 🚀 CI/CD

## Overview

The project employs a set of automated processes for software development, testing, and deployment. This ensures that code changes are integrated frequently, tested automatically, and deployed reliably.

- **Continuous Integration (CI):** Developers frequently merge code into a shared repository, triggering automated tests to catch issues early.
- **Continuous Deployment (CD):** Once code passes testing, it is automatically deployed to production without manual intervention.

## Installation & Setup

### 1. Continuous Integration (CI) → Automates code testing and merging to detect issues early.

#### 1️⃣ Pre-Commit/Pre-Push Validations (Local Automation) → Pre-CI Stage

- **Husky** ensures that the code builds and follows best practices before committing/pushing.
- **Jest** ensures that all unit tests pass before pushing the code.
- **Lint-Staged** runs linters only on changed files.
- **Husky** manages Git hooks.
- **Git CZ** enforces standardized commit messages.
- **Prettier & ESLint** ensure consistent code style and catch linting issues before commits.

This setup reduces broken builds in the repository and prevents bad code from entering CI. Details about the setup can be found in [code formating](./code-formatting.md)

#### 2️⃣ CI Pipeline (Automated in GitHub Actions/GitLab CI/CD)

Our CI workflow is powered by **GitHub Actions**, triggered on every push to the repository. The workflow includes the following steps:

1. **Checkout Repository:** Retrieves the latest code from the repository.
2. **Setup Node.js Environment:** Configures the Node.js environment using a matrix of versions (18.x, 20.x, 22.x) and caches `npm` dependencies for faster builds.
3. **Install Dependencies:** Runs `npm ci` for a clean installation.
4. **Build Project:** Executes `npm run build` to compile the application.
5. **Cache Workspace:** Saves build artifacts (e.g., `.next`, `node_modules`, `package.json`, `package-lock.json`) for use in later jobs.
6. **Run Tests:** Downloads cached artifacts and executes tests with `npm test`.

This workflow ensures that:

- Builds and tests run in a consistent environment.
- NPM dependencies are cached to speed up CI execution.
- Workspaces are preserved across different CI steps using artifacts.

### 2. Continuous Delivery (CD) → Ensures code is always in a deployable state. _(Under Development)_

### 3. Continuous Deployment (CD) → Automatically deploys code after passing tests. _(Under Development)_

## References

- [Setup Node.js Workflow](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
