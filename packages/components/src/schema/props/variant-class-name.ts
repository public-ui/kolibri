import type { Generic } from 'adopted-style-sheets';

import { WatchOptions, watchValidator } from '../utils';
import { isString } from '../validators';

export type VariantClassNamePropType = string | string[];

export type PropVariantClassName = {
	variant: VariantClassNamePropType;
};

const SAFE_CLASS_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]{3,60}$/;
const isValidArrayOrString = (value: unknown) =>
	(Array.isArray(value) && value.every(isSafeClassName)) || (isString(value, 1) && (value as string).split(' ').every(isSafeClassName));
const isSafeClassName = (value: unknown) => typeof value === 'string' && SAFE_CLASS_NAME_RE.test(value);
const SAFE_CLASS_NAME_ALLOWED = new Set([SAFE_CLASS_NAME_RE.source]);

const beforePatchString = (component: Generic.Element.Component): void => {
	if (component.nextState?.has('_variant')) {
		const variants = component.nextState?.get('_variant');
		let nextStateVariants: VariantClassNamePropType = [];
		if (isString(variants, 1)) {
			nextStateVariants = (variants as string).split(' ');
		} else if (Array.isArray(variants)) {
			nextStateVariants = variants;
		}
		component.nextState?.set('_variant', nextStateVariants);
	}
};

export const validateVariantClassName = (component: Generic.Element.Component, value?: VariantClassNamePropType, options: WatchOptions = {}): void => {
	watchValidator(component, '_variant', isValidArrayOrString, SAFE_CLASS_NAME_ALLOWED, value, {
		...options,
		defaultValue: {},
		hooks: {
			afterPatch: options.hooks?.afterPatch,
			beforePatch: (nextValue, nextState, component, key) => {
				if (typeof options.hooks?.beforePatch === 'function') {
					options.hooks?.beforePatch(nextValue, nextState, component, key);
				}
				beforePatchString(component);
			},
		},
	});
};

export const classNameFromVariant = (variants: VariantClassNamePropType | undefined, componentName: string): string => {
	let className = '';

	if (Array.isArray(variants)) {
		variants.forEach((variant) => {
			className += 'kol-' + componentName + '--' + variant + ' ';
		});
	}
	return className;
};
