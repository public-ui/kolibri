import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const loadingOptions = ['eager', 'lazy'] as const;
export type Loading = (typeof loadingOptions)[number];

/**
 * Sets the loading strategy for the image element.
 */
export type PropLoading = {
	loading: Loading;
};

export function validateLoading(component: Generic.Element.Component, value?: Loading): void {
	watchValidator<Loading>(component, '_loading', (value) => typeof value === 'string' && loadingOptions.includes(value), new Set(loadingOptions), value);
}
