import { Generic } from '@a11y-ui/core';

import { KoliBriButtonVariant } from '../../types/button-link';
import { watchValidator } from '../../utils/prop.validators';

export const watchButtonVariant = (component: Generic.Element.Component, propName: string, value?: KoliBriButtonVariant): void => {
	watchValidator(
		component,
		propName,
		(value) => value === 'primary' || value === 'secondary' || value === 'normal' || value === 'danger' || value === 'ghost' || value === 'custom',
		new Set(['KoliBriButtonVariant {primary, secondary, normal, danger, ghost, custom}']),
		value,
		{
			defaultValue: 'normal',
		}
	);
};
