import type { EventCallback, EventValueOrEventCallback } from '../callbacks';
import type { Events } from '../../enums';

export const inputTypeOnOffOptions = ['on', 'off'] as const;
export type InputTypeOnOff = (typeof inputTypeOnOffOptions)[number];

type InputTypeOnBlur = {
	[Events.onBlur]?: EventCallback<Event>;
};

type InputTypeOnClick = {
	[Events.onClick]?: EventCallback<Event>;
};

type InputTypeOnChange = {
	[Events.onChange]?: EventValueOrEventCallback<Event, unknown>;
};

type InputTypeOnFocus = {
	[Events.onFocus]?: EventCallback<Event>;
};

type InputTypeOnInput = {
	[Events.onInput]?: EventValueOrEventCallback<Event, unknown>;
};

// https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element
export type Option<T> = {
	disabled?: boolean;
	label: string | number;
	// selected?: boolean; // wird über den value der *-Komponente gesteuert
	value: T;
};
export type RadioOption<T> = Option<T> & {
	description?: string;
};
export type Optgroup<T> = {
	disabled?: boolean;
	label: string;
	options: Option<T>[];
};

export type SelectOption<T> = Option<T> | Optgroup<T> | RadioOption<T>;

export type InputTypeOnDefault = InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus & InputTypeOnInput;
