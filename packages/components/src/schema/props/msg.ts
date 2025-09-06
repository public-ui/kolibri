import type { Generic } from 'adopted-style-sheets';
import type { AlertProps, InternalAlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject, isString } from '../validators';
import { transformObjectProperties } from '../../utils/transformObjectProperties';

/* types */
export type MsgPropType =
	| (AlertProps & {
			_description: string;
	  })
	| string;

export type InternMsgPropType = Partial<
	InternalAlertProps & {
		description: string;
	}
>;

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
				if (isString(value, { min: 1 })) {
					return true;
				}
				// Allow object values with proper structure
				if (isObject(value) && value !== null) {
					const objValue = value as AlertProps & { _description: string };
					return isString(objValue._description, { min: 1 });
				}

				return false;
			},
			new Set(['MsgPropType', 'string']),
			value as MsgPropType,
		);
	});
};

export function convertMsgToInternMsg(msg?: MsgPropType): InternMsgPropType | undefined {
	if (!msg) {
		return undefined;
	}

	// If msg is a string, convert it to an error message object
	if (typeof msg === 'string') {
		return {
			description: msg,
			type: 'error',
		};
	}

	return transformObjectProperties(msg);
}

export function checkHasMsg(msg?: InternMsgPropType, touched?: boolean): boolean {
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
	const showMsg = msg ? touched === true || msg?.type !== 'error' : false;

	return showMsg;
}
