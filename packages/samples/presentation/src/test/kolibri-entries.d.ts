/**
 * Ambient module declarations for the built KoliBri component chunks.
 *
 * The test setup imports the chunk files directly to warm up Stencil's lazy
 * module cache (see src/test/setup.ts). @public-ui/components does not expose
 * ./dist in its package exports, so the files are resolved via a Vite alias
 * (see vitest.config.ts). This shorthand declaration provides the TypeScript
 * side; the chunk exports are not used directly by the tests.
 */
declare module '@public-ui/components/dist/*';
