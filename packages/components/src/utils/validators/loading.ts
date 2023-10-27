import { Generic } from '@a11y-ui/core';

import { watchValidator } from '../prop.validators';

export const loadingOptions = ['eager', 'lazy'] as const;
export type Loading = (typeof loadingOptions)[number];

export function validateLoading(component: Generic.Element.Component, value?: Loading): void {
	watchValidator<Loading>(component, '_loading', (value) => typeof value === 'string' && loadingOptions.includes(value), new Set(loadingOptions), value);
}
