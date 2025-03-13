import type { Generic } from 'adopted-style-sheets';
import type { AlertProps, InternalAlertProps } from '../components';
import type { Stringified } from '../types';
import { objectObjectHandler, parseJson, watchValidator } from '../utils';
import { isObject } from '../validators';
import { transformObjectProperties } from '../../utils/transformObjectProperties';

/* types */
export type MsgPropType = AlertProps & {
	_description: string;
};

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
			(value) => isObject(value) && typeof value?._description === 'string',
			new Set(['MsgPropType']),
			value as MsgPropType,
			{
				defaultValue: undefined,
			},
		);
	});
};

export function isMsgEmpty(msg?: MsgPropType): boolean {
	if (!msg) {
		return true;
	}

	return msg._type === 'error';
}

export function convertMsgToInternMsg(msg?: MsgPropType): InternMsgPropType | undefined {
	if (!msg || isMsgEmpty(msg)) {
		return undefined;
	}

	return transformObjectProperties(msg);
}

export function checkHasError(msg?: InternMsgPropType, touched?: boolean): boolean {
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
	const showMsg = touched === true || msg?.type !== 'error';

	return showMsg;
}
