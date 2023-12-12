import type { Generic } from 'adopted-style-sheets';

import { AlignPropType, alignPropTypeOptions } from '../../types/props/align';
import { watchValidator } from '../prop.validators';

export const validateAlignment = (component: Generic.Element.Component, propName: string, value?: AlignPropType): void => {
	watchValidator(component, propName, (value) => typeof value === 'string' && alignPropTypeOptions.includes(value), new Set(alignPropTypeOptions), value, {
		defaultValue: 'top',
	});
};
