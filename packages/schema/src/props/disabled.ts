import type { Generic } from 'adopted-style-sheets';

import { a11yHintDisabled, watchBoolean } from '../utils';

/* types */
export type DisabledPropType = boolean;

/**
 * Makes the element not focusable and ignore all events.
 */
export type PropDisabled = {
	disabled: DisabledPropType;
};

/* validator */
export const validateDisabled = (component: Generic.Element.Component, value?: DisabledPropType): void => {
	watchBoolean(component, '_disabled', value, {
		hooks: {
			afterPatch: (value) => {
				if (value === true) {
					a11yHintDisabled();
				}
			},
		},
	});
};
