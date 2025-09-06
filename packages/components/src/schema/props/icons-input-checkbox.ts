import type { Generic } from 'adopted-style-sheets';

import type { AnyIconFontClass, Stringified } from '../types';
import { isString } from '../validators';
import { watchValidator } from '../utils';

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
			((isString((value as Record<string, unknown>).checked) && (value as Record<string, unknown>).checked.length >= 1) ||
				(isString((value as Record<string, unknown>).indeterminate) && (value as Record<string, unknown>).indeterminate.length >= 1) ||
				(isString((value as Record<string, unknown>).unchecked) && (value as Record<string, unknown>).unchecked.length >= 1)),
		new Set(['InputCheckboxIcons']),
		value as unknown,
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
