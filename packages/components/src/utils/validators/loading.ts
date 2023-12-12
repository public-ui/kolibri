import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../prop.validators';

export type Loading = 'eager' | 'lazy';

const AVAILABLE_LOADING_VALUES = new Set(['"eager", "lazy"']);
export function validateLoading(component: Generic.Element.Component, value?: Loading): void {
	watchValidator<Loading>(component, '_loading', (value) => value === 'eager' || value === 'lazy', AVAILABLE_LOADING_VALUES, value);
}
