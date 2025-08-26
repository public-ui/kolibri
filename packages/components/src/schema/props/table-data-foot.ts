import type { Generic } from 'adopted-style-sheets';

import type { SetStateHooks } from '../utils';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState } from '../utils';
import { isObject } from '../validators';
import type { KoliBriTableDataType, Stringified } from '../types';

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
			} else if (typeof value === 'string') {
				value = parseJson<KoliBriTableDataType[]>(value);
			}
			if (Array.isArray(value) && value.every((data: KoliBriTableDataType) => isObject(data))) {
				setState(component, '_dataFoot', value, setStateHooks);
			}
		});
	});
};
