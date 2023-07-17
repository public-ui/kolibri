/**
 * Used in web component properties for stringified complex types.
 *
 * ADVICE: Stencil does not watch unknown typed properties. The solution is to
 *         use a stringified complex type.
 */
export type Stringified<T> = string | T;
