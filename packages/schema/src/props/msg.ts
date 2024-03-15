import type { Generic } from 'adopted-style-sheets';
import type { AlertProps } from '../components';
import { watchValidator } from '../utils';

/* types */
export type MsgPropType = AlertProps;

/**
 * Defines the properties for a message rendered as Alert component.
 */
export type PropMsg = {
	msg: MsgPropType;
};
/* validator */
export const validateMsg = (component: Generic.Element.Component, value?: MsgPropType): void => {
	watchValidator(component, `_msg`, (value) => typeof value === 'object', new Set(['Object']), value);
};
