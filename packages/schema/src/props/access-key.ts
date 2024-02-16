import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';

/* types */
export type AccessKeyPropType = string;

/**
 * Defines the elements access key.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey
 */
export type PropAccessKey = {
	accessKey: AccessKeyPropType;
};

/* validator */
export const validateAccessKey = (component: Generic.Element.Component, value?: AccessKeyPropType): void => {
	watchString(component, '_accessKey', value);
};
