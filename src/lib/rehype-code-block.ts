import type { LineElement } from "rehype-pretty-code";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";

import type { UnistNode, UnistTree } from "@/types/unist";

export function rehypeCodeRawString() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node?.type === "element" && node?.tagName === "pre") {
        const codeEl = node.children?.[0];
        if (codeEl?.tagName !== "code") return;

        const raw = codeEl.children?.[0]?.value;
        if (!raw) return;

        // Capture meta for conditional features
        const meta = (codeEl as any).data?.meta || "";

        (node as any).__rawString__ = raw;
        (node as any).__showLineNumbers__ = meta.includes("showLineNumbers");

        // Also put them in properties as a fallback
        node.properties = {
          ...node.properties,
          __rawString__: raw,
          __showLineNumbers__: meta.includes("showLineNumbers"),
        };
      }
    });
  };
}

export function rehypeHighlightCode() {
  return rehypePrettyCode({
    theme: {
      dark: "github-dark",
      light: "github-light",
    },
    keepBackground: false,
    onVisitLine(node: LineElement) {
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(node: LineElement) {
      node.properties.className = [
        ...((node.properties.className as string[]) || []),
        "highlighted",
      ];
    },
    onVisitHighlightedChars(node: LineElement) {
      node.properties.className = ["word"];
    },
  });
}

export function rehypeHighlightCodeRawString() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // rehype-pretty-code wraps pre in figure
      if (node?.type === "element" && node?.tagName === "figure") {
        if (!node.children) return;
        const preElement = node.children.find(
          (child) => child.tagName === "pre"
        );
        if (!preElement) return;

        // Try to find raw string from properties or carry-over
        const rawString =
          preElement.properties?.["__rawString__"] ||
          (preElement as any).__rawString__ ||
          (node as any).__rawString__;

        const showLineNumbers =
          preElement.properties?.["__showLineNumbers__"] ||
          (preElement as any).__showLineNumbers__ ||
          (node as any).__showLineNumbers__;

        preElement.properties = {
          ...preElement.properties,
          "data-with-meta":
            node.children?.[0]?.tagName === "figcaption" ? "true" : "false",
          "data-raw": rawString,
        };

        if (showLineNumbers) {
          preElement.properties["data-line-numbers"] = "";
        }
      }
    });
  };
}
