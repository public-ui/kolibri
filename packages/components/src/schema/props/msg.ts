import type { Generic } from 'adopted-style-sheets';
import type { AlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject, isString } from '../validators';

/* types */
export type MsgPropType =
	| (Omit<AlertProps, '_label' | '_variant'> & {
			_description: string;
	  })
	| string;

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
			value = parseJson<MsgPropType>(value);
			// eslint-disable-next-line no-empty
		} catch (e) {
			// value keeps original value
		}
		watchValidator<MsgPropType>(
			component,
			`_msg`,
			(value) => {
				// Allow undefined values (for resetting the message)
				if (value === undefined) {
					return true;
				}
				// Allow string values (shorthand for error messages)
				if (typeof value === 'string' && value.length > 0) {
					return true;
				}
				// Allow object values with proper structure
				if (isObject(value) && value !== null) {
					const objValue = value as AlertProps & { _description: string };
					return isString(objValue._description, 1);
				}

				return false;
			},
			new Set(['MsgPropType', 'string']),
			value as MsgPropType,
		);
	});
};

export function checkHasMsg(msg?: MsgPropType, touched?: boolean): boolean {
	/**
	 * We support 5 types of messages:
	 * - default
	 * - info
	 * - success
	 * - warning
	 * - error
	 *
	 * The message is shown if:
	 * - we show only one message at a time
	 * - by error messages the input must be touched
	 */
	if (!msg) {
		return false;
	}

	const type = typeof msg === 'string' ? 'error' : msg._type;
	const showMsg = touched === true || type !== 'error';

	return showMsg;
}
