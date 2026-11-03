import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-alert` — byte-identical to the predecessor on the develop branch
 * (7 props, no methods).
 */
const KOL_ALERT_PUBLIC_API: PublicApiContract = {
	_alert: {
		kind: 'prop',
		type: 'AlertPropType',
		required: false,
		doc: 'Defines whether the screen-readers should read out the notification.',
		default: 'false',
	},
	_hasCloser: {
		kind: 'prop',
		type: 'HasCloserPropType',
		required: false,
		doc: 'Defines whether the element can be closed.',
		default: 'false',
	},
	_label: {
		kind: 'prop',
		type: 'LabelLangSegmentsPropType',
		required: false,
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
		type: 'KoliBriAlertEventCallbacks',
		required: false,
		doc: 'Defines the event callback functions for closing the alert.',
	},
	_type: {
		kind: 'prop',
		type: 'AlertTypePropType',
		required: false,
		doc: 'Defines either the type of the component or of the components interactive element.',
		default: "'default'",
	},
	_variant: {
		kind: 'prop',
		type: 'AlertVariantPropType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
		default: "'msg'",
	},
};

describePublicApiContract({ tag: 'kol-alert', component: 'alert', pinnedApi: KOL_ALERT_PUBLIC_API, schemaInterface: 'AlertProps' });
