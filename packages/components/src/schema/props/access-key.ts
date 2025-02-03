import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';

/* types */
export type AccessKeyPropType = string;

/**
 * Defines which key combination can be used to trigger or focus the interactive element of the component.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey
 */
export type PropAccessKey = {
	accessKey: AccessKeyPropType;
};

/* validator */
export const validateAccessKey = (component: Generic.Element.Component, value?: AccessKeyPropType): void => {
	watchString(component, '_accessKey', value);
};
