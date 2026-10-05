/**
 * Reusable hint functions for prop definitions.
 *
 * These functions can be passed to the `hints` option in `createPropDefinition`
 * to provide developer guidance for accessibility and UX concerns.
 *
 * @example
 * ```typescript
 * export const myProp = createPropDefinition<MyProp>(
 *   'myProp',
 *   '',
 *   normalizeString,
 *   (v) => v.length >= 2,
 *   { hints: labelHints }
 * );
 * ```
 */

export * from './label-hints';
