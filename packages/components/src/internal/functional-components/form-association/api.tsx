import { ariaDetailsProp, nameProp, syncValueBySelectorProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const formAssociationPropsConfig = {
	optional: [ariaDetailsProp, nameProp, syncValueBySelectorProp],
} as const satisfies PropsConfigShape;

export type FormAssociationApi = ApiFromConfig<typeof formAssociationPropsConfig>;

/**
 * Kind of the native element that represents the component in a form. `checkbox`, `combobox` and
 * `single-select` reflect their value into a hidden input.
 */
export type FormAssociationType =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'combobox'
	| 'date'
	| 'email'
	| 'file'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'select'
	| 'single-select'
	| 'text'
	| 'textarea';
