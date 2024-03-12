import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

/* types */
/**
 * Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
 */
export type AriaCurrentPropType = 'date' | 'location' | 'page' | 'step' | 'time' | boolean;

/**
 * @deprecated use `PropListenAriaCurrent` instead
 */
export type PropAriaCurrent = {
	/**
	 * @deprecated use `listenAriaCurrent` instead
	 */
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
		(value) => value === 'date' || value === 'location' || value === 'page' || value === 'step' || value === 'time' || value === true || value === false,
		new Set(['String {data, location, page, step, time}', 'boolean']),
		value,
	);
};
export const validateAriaCurrent = (component: Generic.Element.Component, value?: AriaCurrentPropType): void => {
	validate(component, '_ariaCurrent', value);
};
export const validateListenAriaCurrent = (component: Generic.Element.Component, value?: AriaCurrentPropType): void => {
	validate(component, '_listenAriaCurrent', value);
};
