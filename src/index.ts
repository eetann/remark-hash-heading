import type { Root, Text } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type Options = {
  minDepth?: 1 | 2 | 3 | 4 | 5 | 6;
  maxDepth?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const remarkHashHeading: Plugin<[Options?], Root> = (options = {}) => {
  const minDepth = options.minDepth ?? 1;
  const maxDepth = options.maxDepth ?? 6;

  return (tree) => {
    visit(tree, "heading", (node) => {
      if (node.depth < minDepth || node.depth > maxDepth) {
        return;
      }
      const hashPrefix: Text = {
        type: "text",
        value: "#".repeat(node.depth) + " ",
      };
      node.children.unshift(hashPrefix);
    });
  };
};

export default remarkHashHeading;
