# Testing Guide

This project uses Vitest and React Testing Library for unit and integration testing.

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once (for CI/CD)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

```
tests/
├── components/          # Component tests
│   ├── FadeIn.test.tsx
│   ├── Navbar.test.tsx
│   └── VideoEmbed.test.tsx
├── utils/              # Utility function tests
│   └── analytics.test.ts
└── setup.ts            # Test configuration
```

## Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { fireEvent } from '@testing-library/react';

it('handles click events', () => {
  render(<Button onClick={handleClick} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
});
```

### Testing Async Behavior

```typescript
import { waitFor } from '@testing-library/react';

it('loads data asynchronously', async () => {
  render(<AsyncComponent />);
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## Test Coverage Goals

- Components: 80%+ coverage
- Utilities: 90%+ coverage
- Critical paths: 100% coverage

## Best Practices

1. **Test behavior, not implementation**
   - Focus on what users see and do
   - Avoid testing internal state

2. **Use semantic queries**
   - Prefer `getByRole`, `getByLabelText`
   - Avoid `getByTestId` unless necessary

3. **Keep tests simple**
   - One assertion per test when possible
   - Clear test names describing what's being tested

4. **Mock external dependencies**
   - Mock API calls
   - Mock browser APIs (localStorage, etc.)
   - Mock third-party libraries when needed

5. **Test accessibility**
   - Verify ARIA attributes
   - Test keyboard navigation
   - Check screen reader compatibility

## Common Testing Patterns

### Testing Forms

```typescript
it('submits form with valid data', () => {
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com'
  });
});
```

### Testing Error States

```typescript
it('displays error message on failure', async () => {
  mockApi.mockRejectedValue(new Error('Failed'));
  
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

### Testing Loading States

```typescript
it('shows loading spinner', () => {
  render(<AsyncComponent />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});
```

## Debugging Tests

### View rendered output

```typescript
import { screen } from '@testing-library/react';

// Print the DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));
```

### Use Vitest UI

```bash
npm run test:ui
```

Opens a browser interface for debugging tests.

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Run tests
  run: npm run test:run

- name: Generate coverage
  run: npm run test:coverage
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
