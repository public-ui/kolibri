import type { Generic } from 'adopted-style-sheets';
import type { AlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject, isString } from '../validators';

/* types */
export type MsgPropType = Omit<AlertProps, '_label' | '_variant'> & { _description: string };

/**
 * Defines the properties for a message rendered as Alert component.
 */
export type PropMsg = {
	msg: Stringified<MsgPropType>;
};

/* validator */
export const validateMsg = (component: Generic.Element.Component, value?: Stringified<MsgPropType>): void => {
	objectObjectHandler(value, () => {
		try {
			value = parseJson<MsgPropType>(value);
		} catch (e) {
			// value keeps original value
		}
		watchValidator<MsgPropType>(
			component,
			`_msg`,
			(value) => {
				if (value === undefined) {
					return true;
				}
				if (typeof value === 'string' && value.length > 0) {
					return true;
				}
				if (isObject(value) && value !== null) {
					const desc = (value as { _description?: unknown })._description;
					return isString(desc, 1);
				}

				return false;
			},
			new Set(['MsgPropType', 'string']),
			value as MsgPropType,
		);
	});
};

export function checkHasMsg(msg?: Stringified<MsgPropType>, touched?: boolean): boolean {
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
