import type { W3CInputValue } from './w3c';

/**
 * All types without undefined
 *
 * Stencil does not support "unknown" type for properties.
 * -> export type StencilUnknown = unknown | null | undefined;
 */
export type StencilUnknown = W3CInputValue | undefined;
