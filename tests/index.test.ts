import { test, expect } from "bun:test";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkHashHeading from "../src/index";

test("h1: # foo -> <h1># foo</h1>", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("# foo");

  expect(String(result)).toBe("<h1># foo</h1>\n");
});

test("h2: ## foo -> <h2>## foo</h2>", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("## foo");

  expect(String(result)).toBe("<h2>## foo</h2>\n");
});

test("h3: ### foo -> <h3>### foo</h3>", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("### foo");

  expect(String(result)).toBe("<h3>### foo</h3>\n");
});

test("h4: #### foo -> <h4>#### foo</h4>", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("#### foo");

  expect(String(result)).toBe("<h4>#### foo</h4>\n");
});

test("h5: ##### foo -> <h5>##### foo</h5>", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("##### foo");

  expect(String(result)).toBe("<h5>##### foo</h5>\n");
});

test("h6: ###### foo -> <h6>###### foo</h6>", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("###### foo");

  expect(String(result)).toBe("<h6>###### foo</h6>\n");
});

test("minDepth: 2 - h1 should not have hash prefix", async () => {
  const result = await remark()
    .use(remarkHashHeading, { minDepth: 2 })
    .use(remarkHtml)
    .process("# foo");

  expect(String(result)).toBe("<h1>foo</h1>\n");
});

test("minDepth: 2 - h2 should have hash prefix", async () => {
  const result = await remark()
    .use(remarkHashHeading, { minDepth: 2 })
    .use(remarkHtml)
    .process("## foo");

  expect(String(result)).toBe("<h2>## foo</h2>\n");
});

test("maxDepth: 2 - h2 should have hash prefix", async () => {
  const result = await remark()
    .use(remarkHashHeading, { maxDepth: 2 })
    .use(remarkHtml)
    .process("## foo");

  expect(String(result)).toBe("<h2>## foo</h2>\n");
});

test("maxDepth: 2 - h3 should not have hash prefix", async () => {
  const result = await remark()
    .use(remarkHashHeading, { maxDepth: 2 })
    .use(remarkHtml)
    .process("### foo");

  expect(String(result)).toBe("<h3>foo</h3>\n");
});

test("minDepth: 2, maxDepth: 4 - only h2, h3, h4 should have hash prefix", async () => {
  const processor = remark()
    .use(remarkHashHeading, { minDepth: 2, maxDepth: 4 })
    .use(remarkHtml);

  const h1Result = await processor.process("# foo");
  expect(String(h1Result)).toBe("<h1>foo</h1>\n");

  const h2Result = await processor.process("## foo");
  expect(String(h2Result)).toBe("<h2>## foo</h2>\n");

  const h3Result = await processor.process("### foo");
  expect(String(h3Result)).toBe("<h3>### foo</h3>\n");

  const h4Result = await processor.process("#### foo");
  expect(String(h4Result)).toBe("<h4>#### foo</h4>\n");

  const h5Result = await processor.process("##### foo");
  expect(String(h5Result)).toBe("<h5>foo</h5>\n");
});

test("heading with inline elements: ## foo **bar**", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("## foo **bar**");

  expect(String(result)).toBe("<h2>## foo <strong>bar</strong></h2>\n");
});

test("heading with link: ## [foo](url)", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("## [foo](https://example.com)");

  expect(String(result)).toBe(
    '<h2>## <a href="https://example.com">foo</a></h2>\n',
  );
});

test("empty heading: ##", async () => {
  const result = await remark()
    .use(remarkHashHeading)
    .use(remarkHtml)
    .process("##");

  expect(String(result)).toBe("<h2>## </h2>\n");
});
