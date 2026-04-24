import type { Generic } from 'adopted-style-sheets';

import type { AnyIconFontClass, Stringified } from '../types';
import { watchValidator } from '../utils';
import { isString } from '../validators';

export type InputCheckboxIconsProp =
	| {
			checked: AnyIconFontClass;
			indeterminate?: AnyIconFontClass;
			unchecked?: AnyIconFontClass;
	  }
	| {
			checked?: AnyIconFontClass;
			indeterminate: AnyIconFontClass;
			unchecked?: AnyIconFontClass;
	  }
	| {
			checked?: AnyIconFontClass;
			indeterminate?: AnyIconFontClass;
			unchecked: AnyIconFontClass;
	  };

export type InputCheckboxIconsState = {
	checked: AnyIconFontClass;
	indeterminate: AnyIconFontClass;
	unchecked: AnyIconFontClass;
};

export type InputCheckboxIconsPropType = Stringified<InputCheckboxIconsProp>;

export type PropIconsInputCheckbox = {
	icons: InputCheckboxIconsPropType;
};

export const validateIconsInputCheckbox = (component: Generic.Element.Component, value?: InputCheckboxIconsPropType): void => {
	watchValidator<unknown>(
		component,
		'_icons',
		(value): boolean =>
			typeof value === 'object' &&
			value !== null &&
			(isString((value as Record<string, unknown>).checked, 1) ||
				isString((value as Record<string, unknown>).indeterminate, 1) ||
				isString((value as Record<string, unknown>).unchecked, 1)),
		new Set(['InputCheckboxIcons']),
		value,
		{
			hooks: {
				beforePatch: (nextValue: unknown, nextState: Map<string, unknown>, component: Generic.Element.Component) => {
					nextState.set('_icons', {
						...(component.state._icons as InputCheckboxIconsState),
						...(nextValue as InputCheckboxIconsProp),
					});
				},
			},
		},
	);
};
