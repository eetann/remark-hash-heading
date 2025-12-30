# Development

Use Bun instead of Node.js/npm/yarn/pnpm.

## Scripts

```sh
bun run lint       # Run linter (oxlint)
bun run format     # Format code (oxfmt)
bun run typecheck  # Type check
bun run test       # Run tests
bun run build      # Build for production
```

## APIs

- It will be distributed as a CLI, and since users who do not use Bun will also execute it, the use of Bun APIs is prohibited. Bun APIs may only be used in tests.
  - Example: Prefer `node:fs`'s readFile/writeFile over `Bun.file`

## Testing

Use `bun test` to run tests.

```ts#tests/foo.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.

## Code Quality

- Format and lint using OXC
- The project uses tab indentation and double quotes
- **Use English for all comments and commit messages**
