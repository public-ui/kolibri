import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-accordion` — 5 props plus `focus()` and `click()`. `_open` keeps its
 * `mutable`/`reflect` decorators so the reflected attribute is already updated when the delayed
 * `onClick`/`onToggle` callbacks read it.
 *
 * `kol-accordion` and `kol-details` share one collapsible layer:
 * - `_on` is typed `CollapsibleCallbacksPropType<boolean>`; `AccordionCallbacksPropType` is a
 *   `@deprecated` alias of the same shape.
 * - `_label` is declared with the `LabelPropType` schema alias, like in `kol-details`.
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
		type: 'DisabledPropType',
		required: false,
		doc: 'Makes the element not focusable and ignore all events.',
		default: 'false',
	},
	_label: {
		kind: 'prop',
		type: 'LabelLangSegmentsPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
		default: '0',
	},
	_on: {
		kind: 'prop',
		type: 'CollapsibleCallbacksPropType<boolean>',
		required: false,
		doc: 'Defines the callback functions for the collapsible.',
	},
	_open: {
		kind: 'prop',
		type: 'OpenPropType',
		required: false,
		doc: 'Opens/expands the element when truthy, closes/collapses when falsy.',
		default: 'false',
	},
};

describePublicApiContract({ tag: 'kol-accordion', component: 'accordion', pinnedApi: KOL_ACCORDION_PUBLIC_API, schemaInterface: 'AccordionProps' });
