# 🧪 Testing

## Overview

This document outlines the testing strategy for the application, leveraging the **Jest** library for both unit testing and end-to-end (E2E) testing. Ensuring a well-tested codebase improves reliability, maintainability, and overall software quality.

## Testing Strategy

### 1. Unit Testing

Unit tests focus on individual functions and components to verify they work as expected in isolation.

#### Tools Used:

- **Jest**: A powerful JavaScript testing framework
- **React Testing Library**: For testing React components

#### Example Test Case:

```ts
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Note from "../components/Note";

it("renders a note correctly", () => {
  render(<Note content="Test Note" />);
  expect(screen.getByText("Test Note")).toBeInTheDocument();
});
```

## Running Tests

### Running Unit Tests:

```sh
npm run test
```

## Best Practices

- Write meaningful and isolated unit tests.
- Use mocks and spies to prevent testing external dependencies.
