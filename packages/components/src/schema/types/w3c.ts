/**
 * All types without undefined
 *
 * Stencil does not support "unknown" type for properties.
 * -> export type W3CInputValue = unknown | null;
 */
export type W3CInputValue = string | number | boolean | object | symbol | bigint | null;
