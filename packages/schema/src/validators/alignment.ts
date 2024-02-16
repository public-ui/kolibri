import type { Generic } from 'adopted-style-sheets';

import type { AlignPropType } from '../props';
import { alignPropTypeOptions } from '../props';
import { watchValidator } from '../utils';

export const validateAlignment = (component: Generic.Element.Component, propName: string, value?: AlignPropType): void => {
	watchValidator(component, propName, (value) => typeof value === 'string' && alignPropTypeOptions.includes(value), new Set(alignPropTypeOptions), value, {
		defaultValue: 'top',
	});
};
