import type { Generic } from 'adopted-style-sheets';
import type { AlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject, isString } from '../validators';

/* types */
export type MsgPropType = Omit<AlertProps, '_level' | '_on' | '_label' | '_hasCloser' | '_variant'> & { _description: string };

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
		} catch {
			// value keeps original value
		}
		watchValidator<Stringified<MsgPropType>>(
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
			value as Stringified<MsgPropType>,
		);
	});
};

export function isMsgDefinedAndInputTouched(msg?: Stringified<MsgPropType>, touched?: boolean): boolean {
	/**
	 * We support 5 types of messages:
	 * - default
	 * - info
	 * - success
	 * - warning
	 * - error
	 *
	 * Messages on inputs are only rendered after the field has been touched,
	 * regardless of the message type.
	 */
	return Boolean(msg) && touched === true;
}

export const checkHasMsg = isMsgDefinedAndInputTouched;

/**
 * @param msg
 * @param touched
 * @returns Wether the field shows a type error msg -> field is invalid
 */
export function isInvalid(msg?: Stringified<MsgPropType>, touched?: boolean): boolean {
	return Boolean(msg) && (msg as MsgPropType)._type === 'error' && touched === true;
}

export function normalizeMsg(msg?: Stringified<MsgPropType>): MsgPropType | undefined {
	if (typeof msg === 'string') {
		try {
			return parseJson<MsgPropType>(msg);
		} catch {
			return { _description: msg, _type: 'error' };
		}
	}
	if (msg && typeof msg === 'object' && !('_type' in msg)) {
		return { ...msg, _type: 'error' };
	}
	return msg;
}

export function getMsgType(msg?: Stringified<MsgPropType>): MsgPropType['_type'] | 'error' {
	if (typeof msg === 'string') {
		return 'error';
	}

	return msg?._type ?? 'error';
}
