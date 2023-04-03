import { Events } from '../../enums/events';
import { EventCallback, EventValueOrEventCallback } from '../callbacks';

export type InputTypeOnOff = 'on' | 'off';

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

// https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element
export type Option<T> = {
	disabled?: boolean;
	label: string | number;
	// selected?: boolean; // wird über den value der *-Komponente gesteuert
	value: T;
};

export type Optgroup<T> = {
	disabled?: boolean;
	label: string;
	options: Option<T>[];
};

export type SelectOption<T> = Option<T> | Optgroup<T>;

export type InputTypeOnDefault = InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus;
