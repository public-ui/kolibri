import { Generic } from '@a11y-ui/core';

import { watchValidator } from '../../utils/prop.validators';

/* types */
/**
 * Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
 */
export const ariaCurrentPropTypeOptions = ['date', 'location', 'page', 'step', 'time', true, false] as const;
export type AriaCurrentPropType = (typeof ariaCurrentPropTypeOptions)[number];

export type PropAriaCurrent = {
	// only used for state
	ariaCurrent: AriaCurrentPropType;
};

export type PropListenAriaCurrent = {
	listenAriaCurrent: AriaCurrentPropType;
};

/* validator */
const validate = (component: Generic.Element.Component, propName: string, value?: AriaCurrentPropType): void => {
	watchValidator(
		component,
		propName,
		(value?) => (typeof value === 'string' || typeof value === 'boolean') && ariaCurrentPropTypeOptions.includes(value),
		new Set([`String {${ariaCurrentPropTypeOptions.filter((option) => typeof option === 'string').join(', ')}`, 'true', 'false']),
		value
	);
};
export const validateAriaCurrent = (component: Generic.Element.Component, value?: AriaCurrentPropType): void => {
	validate(component, '_ariaCurrent', value);
};
export const validateListenAriaCurrent = (component: Generic.Element.Component, value?: AriaCurrentPropType): void => {
	validate(component, '_listenAriaCurrent', value);
};
