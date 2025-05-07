import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';
import type { TableSettings } from '../types/table-settings';

/* types */
export type TableSettingsPropType = TableSettings;

/**
 * Defines the table settings including column visibility, order and width.
 */
export type PropTableSettings = {
	tableSettings: TableSettingsPropType;
};

/* validator */
export const validateTableSettings = (component: Generic.Element.Component, value?: TableSettingsPropType): void => {
	watchValidator(component, `_tableSettings`, (value) => typeof value === 'object' && value !== null, new Set(['TableSettings']), value);
};
