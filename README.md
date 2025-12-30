# remark-hash-heading

A [remark](https://github.com/remarkjs/remark) plugin to add hash symbols to headings.

Transforms `## foo` into `<h2>## foo</h2>`, keeping the Markdown-style `#` prefix in the output.

## Installation

```bash
npm install remark-hash-heading
```

## Usage

```js
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkHashHeading from "remark-hash-heading";

const result = await remark()
  .use(remarkHashHeading)
  .use(remarkHtml)
  .process("## Hello World");

console.log(String(result));
// <h2>## Hello World</h2>
```

## Options

### `minDepth`

Type: `1 | 2 | 3 | 4 | 5 | 6`
Default: `1`

Minimum heading depth to process. Headings shallower than this level will not have hash prefixes added.

### `maxDepth`

Type: `1 | 2 | 3 | 4 | 5 | 6`
Default: `6`

Maximum heading depth to process. Headings deeper than this level will not have hash prefixes added.

### Example with options

```js
// Only add hash prefixes to h2, h3, and h4
const result = await remark()
  .use(remarkHashHeading, { minDepth: 2, maxDepth: 4 })
  .use(remarkHtml)
  .process("# Title\n\n## Section\n\n### Subsection");

// Output:
// <h1>Title</h1>
// <h2>## Section</h2>
// <h3>### Subsection</h3>
```

## Usage with Astro

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import remarkHashHeading from "remark-hash-heading";

export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkHashHeading,
      // or with options:
      // [remarkHashHeading, { minDepth: 2 }],
    ],
  },
});
```

## License

MIT
