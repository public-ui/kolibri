import type { CollapsibleCallbacksPropType, PropCollapsibleCallbacks } from './collapsible-callbacks';

/* types */

/**
 * @deprecated Use `CollapsibleCallbacksPropType` instead. `kol-accordion` and `kol-details` share
 * one callback contract; this alias is kept so existing imports keep compiling.
 *
 * Note: the shared type also carries `onClick`, which `kol-details` did not previously accept.
 * That is an additive widening — objects that only set `onToggle` stay assignable.
 */
export type DetailsCallbacksPropType<T> = CollapsibleCallbacksPropType<T>;

/**
 * @deprecated Use `PropCollapsibleCallbacks` instead.
 */
export type PropDetailsCallbacks<T> = PropCollapsibleCallbacks<T>;
