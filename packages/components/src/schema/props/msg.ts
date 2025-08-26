import type { Generic } from 'adopted-style-sheets';
import type { AlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject } from '../validators';

/* types */
export type MsgPropType = AlertProps & {
	_description: string;
};

/**
 * Defines the properties for a message rendered as Alert component.
 */
export type PropMsg = {
	msg: MsgPropType;
};

/* validator */
export const validateMsg = (component: Generic.Element.Component, value?: Stringified<MsgPropType>): void => {
	objectObjectHandler(value, () => {
		if (typeof value === 'string') {
			value = parseJson<MsgPropType>(value);
		}
		watchValidator<MsgPropType>(
			component,
			`_msg`,
			(value) => isObject(value) && typeof value?._description === 'string',
			new Set(['MsgPropType']),
			value as MsgPropType,
			{
				defaultValue: {
					_description: '',
					_type: 'error',
				},
			},
		);
	});
};
