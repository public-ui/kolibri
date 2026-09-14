import type { CollapsibleCallbacksPropType, PropCollapsibleCallbacks } from './collapsible-callbacks';

/* types */

/**
 * @deprecated Use `CollapsibleCallbacksPropType` instead. `kol-accordion` and `kol-details` share
 * one callback contract; this alias is kept so existing imports keep compiling.
 */
export type AccordionCallbacksPropType<T> = CollapsibleCallbacksPropType<T>;

/**
 * @deprecated Use `PropCollapsibleCallbacks` instead.
 */
export type PropAccordionCallbacks<T> = PropCollapsibleCallbacks<T>;
