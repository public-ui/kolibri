import type { Generic } from 'adopted-style-sheets';

import type { KoliBriTableDataType, Stringified } from '../types';
import type { SetStateHooks } from '../utils';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState } from '../utils';

/* types */
export type TableDataFootPropType = Stringified<KoliBriTableDataType[]>;

/**
 * Defines the data for the table footer.
 */
export type PropTableDataFoot = {
	dataFoot: TableDataFootPropType;
};

/* validator */
export const validateTableDataFoot = (component: Generic.Element.Component, value?: TableDataFootPropType, setStateHooks?: SetStateHooks): void => {
	emptyStringByArrayHandler(value, () => {
		objectObjectHandler(value, () => {
			if (typeof value === 'undefined') {
				value = [];
			}
			try {
				value = parseJson<KoliBriTableDataType[]>(value);
			} catch (e) {
				// value keeps the original data
			}
			if (Array.isArray(value) && value.every((data: KoliBriTableDataType) => typeof data === 'object' && data !== null)) {
				setState(component, '_dataFoot', value, setStateHooks);
			}
		});
	});
};
