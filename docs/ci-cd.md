## CI/CD Pipeline

The project employs a robust Continuous Integration and Continuous Deployment (CI/CD) pipeline to maintain code quality and streamline deployments. The key components of my pipeline include:

- Code Formatting and Linting: We utilize Prettier for code formatting and ESLint for identifying and fixing linting issues. These tools help ensure a consistent code style across the project.
- Pre-commit Hooks: Using Husky and lint-staged, we enforce code quality by running linters and formatters on staged files before commits. This ensures that only well-formatted and lint-free code is committed.
- Continuous Integration: Our CI workflow is powered by GitHub Actions. The workflow is triggered on every push to the repository and includes the following steps:

  1. Checkout Repository: Retrieves the latest code from the repository.

  2. Setup Node.js Environment: Configures the Node.js environment using the specified version.

  3. Install Dependencies: Installs project dependencies using npm ci for a clean and reliable installation.

  4. Run Tests: Executes the test suite to ensure all tests pass successfully.
