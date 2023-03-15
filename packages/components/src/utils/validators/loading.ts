import { Generic } from '@a11y-ui/core';
import { watchValidator } from '../prop.validators';

export type Loading = 'eager' | 'lazy';

const AVAILABLE_LOADING_VALUES = new Set(['"eager", "lazy"']);
export const validateLoading = (component: Generic.Element.Component, value?: Loading): void => {
	watchValidator(component, 'loading', (value) => value === 'eager' || value === 'lazy', AVAILABLE_LOADING_VALUES, value);
};
