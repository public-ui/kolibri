import type { Generic } from 'adopted-style-sheets';

import type { SetStateHooks } from '../utils';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState } from '../utils';
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
			}
			try {
				value = parseJson<KoliBriTableDataType[]>(value);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value keeps the original data
			}
			if (Array.isArray(value) && value.every((data: KoliBriTableDataType) => typeof data === 'object' && data !== null)) {
				setState(component, '_data', value, setStateHooks);
			}
		});
	});
};
