import type { Generic } from 'adopted-style-sheets';

import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState, SetStateHooks } from '../utils';
import { isObject } from '../validators';
import type { KoliBriTableDataType, Stringified } from '../types';

/* types */
export type TableDataPropType = Stringified<KoliBriTableDataType[]>;

/**
 * Defines the primary table data.
 */
export type PropTableData = {
	data: TableDataPropType;
};

/* validator */
export const validateTableData = (component: Generic.Element.Component, value?: TableDataPropType, setStateHooks?: SetStateHooks): void => {
	emptyStringByArrayHandler(value, () => {
		objectObjectHandler(value, () => {
			if (typeof value === 'undefined') {
				value = [];
			} else if (typeof value === 'string') {
				value = parseJson<KoliBriTableDataType[]>(value);
			}
			if (Array.isArray(value) && value.every((data: KoliBriTableDataType) => isObject(data))) {
				setState(component, '_data', value, setStateHooks);
			}
		});
	});
};
