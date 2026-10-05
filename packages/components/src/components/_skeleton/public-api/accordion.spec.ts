import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-accordion` — 5 props plus `focus()` and `click()`. `_open` keeps its
 * `mutable`/`reflect` decorators so the reflected attribute is already updated when the delayed
 * `onClick`/`onToggle` callbacks read it.
 *
 * Consciously changed against the predecessor when `kol-accordion` and `kol-details` were
 * consolidated onto one collapsible layer (owner-approved, noted in the PR):
 * - `_on` is typed `CollapsibleCallbacksPropType<boolean>` — the same shape as the former
 *   `AccordionCallbacksPropType`, which survives as a `@deprecated` alias.
 * - `_label` is declared with the `LabelPropType` schema alias instead of the primitive `string`,
 *   matching `kol-details` and every other migrated component. Same type, no runtime effect.
 * - `click()` no longer mentions "the first section", a leftover of the pre-migration
 *   multi-section accordion.
 */
const KOL_ACCORDION_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Triggers a click on the heading toggle button.',
	},
	_disabled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Makes the element not focusable and ignore all events.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'CollapsibleCallbacksPropType<boolean>',
		required: false,
		doc: 'Defines the callback functions for the collapsible.',
	},
	_open: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Opens/expands the element when truthy, closes/collapses when falsy. @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.',
	},
};

describePublicApiContract({ tag: 'kol-accordion', component: 'accordion', pinnedApi: KOL_ACCORDION_PUBLIC_API, schemaInterface: 'AccordionProps' });
