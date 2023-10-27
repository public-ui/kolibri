import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';

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
