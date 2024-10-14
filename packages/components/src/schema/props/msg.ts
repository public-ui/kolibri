import type { Generic } from 'adopted-style-sheets';
import type { AlertProps } from '../components';
import { objectObjectHandler, parseJson, setState, watchValidator } from '../utils';
import type { Stringified } from '../types';

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
		try {
			value = parseJson<MsgPropType>(value as string);
			// eslint-disable-next-line no-empty
		} catch (e) {
			// value keeps original value
		}

		watchValidator(component, `_msg`, (value) => typeof value === 'object', new Set(['Object']), value);
	});
};
