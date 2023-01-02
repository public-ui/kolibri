import { defineConfig } from "vite";

// https://github.com/slidevjs/slidev/blob/b55faff107e1f9712c6d56578168a27a5a434b5c/packages/slidev/node/plugins/preset.ts#L22
const customElements = new Set([
  // katex
  "annotation",
  "math",
  "menclose",
  "mfrac",
  "mglyph",
  "mi",
  "mlabeledtr",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "mspace",
  "msqrt",
  "mstyle",
  "msub",
  "msubsup",
  "msup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "semantics",
]);

export default defineConfig({
  slidev: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => customElements.has(tag) || /^kol/.test(tag),
        },
      },
    },
  },
});
