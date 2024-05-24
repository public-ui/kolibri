import type { Generic } from 'adopted-style-sheets';
import type { KoliBriTableSelection, Stringified } from '../types';
import { parseJson, setState } from '../utils';
import { isObject } from '../validators';

/* types */
export type TableSelectionPropType = Stringified<KoliBriTableSelection>;

/**
 * Defines how rows can be selected and the current selection.
 */
export type PropTableSelection = {
	selection: TableSelectionPropType;
};

/* validator */
export const validateTableSelection = (component: Generic.Element.Component, value?: TableSelectionPropType): void => {
	const parseSerializedValue = () => {
		try {
			return parseJson<KoliBriTableSelection>(value);
		} catch (e) {
			return undefined;
		}
	};

	const validateObject = (value?: KoliBriTableSelection) => {
		return value && isObject(value) && typeof value.label === 'function' && (!value.selectedKeys || Array.isArray(value.selectedKeys));
	};

	const objectValue = typeof value === 'string' ? parseSerializedValue() : value;
	if (validateObject(objectValue)) {
		setState(component, '_selection', value);
	}
};
