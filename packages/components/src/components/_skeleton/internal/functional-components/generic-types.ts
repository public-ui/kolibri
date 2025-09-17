import type { EventEmitter } from '@stencil/core';

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type LowerAlphabet =
	| 'a'
	| 'b'
	| 'c'
	| 'd'
	| 'e'
	| 'f'
	| 'g'
	| 'h'
	| 'i'
	| 'j'
	| 'k'
	| 'l'
	| 'm'
	| 'n'
	| 'o'
	| 'p'
	| 'q'
	| 'r'
	| 's'
	| 't'
	| 'u'
	| 'v'
	| 'w'
	| 'x'
	| 'y'
	| 'z';
type UpperAlphabet = Uppercase<LowerAlphabet>;
type AlphaNumeric = LowerAlphabet | UpperAlphabet | Digit;
type AlphaNumericString = '' | `${AlphaNumeric}${AlphaNumericString}`;
type CamelCaseString = `${LowerAlphabet}${AlphaNumericString}`;

export type CamelCaseKey<Key extends string> = Key extends CamelCaseString ? Key : never;

type CamelCaseRecord = Partial<Record<CamelCaseString, unknown>>;

type Callback<T> = (value?: T) => void;

export interface ComponentApi {
	Props?: CamelCaseRecord;
	States?: CamelCaseRecord;
	Emitters?: CamelCaseRecord;
	Methods?: CamelCaseRecord;
	Listeners?: CamelCaseRecord;
	Callbacks?: CamelCaseRecord;
	Refs?: CamelCaseRecord;
}

type Extract<T extends ComponentApi, K extends keyof ComponentApi> = T[K] extends CamelCaseRecord ? T[K] : Record<never, never>;

type ExtractProps<T extends ComponentApi> = Extract<T, 'Props'>;
type ExtractStates<T extends ComponentApi> = Extract<T, 'States'>;
type ExtractEmitters<T extends ComponentApi> = Extract<T, 'Emitters'>;
type ExtractMethods<T extends ComponentApi> = Extract<T, 'Methods'>;
type ExtractListeners<T extends ComponentApi> = Extract<T, 'Listeners'>;
type ExtractCallbacks<T extends ComponentApi> = Extract<T, 'Callbacks'>;
type ExtractRefs<T extends ComponentApi> = Extract<T, 'Refs'>;

type ComponentCallbacks<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: Callbacks[K];
};

type WebComponentEmitters<Emitters> = {
	[K in keyof Emitters as `${Lowercase<string & K>}`]: EventEmitter<Emitters[K]>;
};

type FunctionalComponentEmitters<Emitters> = {
	[K in keyof Emitters as `on${Capitalize<string & K>}`]: EventEmitter<Emitters[K]>;
};

type ComponentProps<Props> = {
	[K in keyof Props as `_${Lowercase<string & K>}`]: Props[K];
};

type ComponentRefs<Refs> = {
	[K in keyof Refs as `ref${Capitalize<string & K>}`]: (element?: Refs[K]) => void;
};

type ComponentListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

type ComponentMethods<Methods> = {
	[K in keyof Methods]: Methods[K];
};

type ComponentWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: Callback<Props[K]>;
};

export type NotNullableFields<Props> = {
	[K in keyof Props]-?: NonNullable<Props[K]>;
};

export type WebComponentInterface<T extends ComponentApi = ComponentApi> = {
	componentWillLoad(): void;
} & ComponentProps<ExtractProps<T>> &
	NotNullableFields<ExtractStates<T>> &
	ComponentWatchers<ExtractProps<T>> &
	WebComponentEmitters<ExtractEmitters<T>> &
	ComponentMethods<ExtractMethods<T>> &
	ComponentListeners<ExtractListeners<T>>;

export type FunctionalComponentProps<T extends ComponentApi = ComponentApi> = NotNullableFields<ExtractProps<T>> &
	NotNullableFields<ExtractStates<T>> &
	ComponentCallbacks<ExtractCallbacks<T>> &
	ComponentRefs<ExtractRefs<T>> &
	FunctionalComponentEmitters<ExtractEmitters<T>>;

type ControllerCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: (element?: Callbacks[K]) => void;
};

type ControllerListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

type ControllerMethods<Methods> = {
	[K in keyof Methods]: Methods[K];
};

type ControllerRefSetters<Refs> = {
	[K in keyof Refs as `set${Capitalize<string & K>}Ref`]: (element?: Refs[K]) => void;
};

export type ControllerInterface<T extends ComponentApi = ComponentApi> = {
	componentWillLoad(props: NotNullableFields<ExtractProps<T>>): void;
	getProps(): NotNullableFields<ExtractProps<T>>;
} & ComponentWatchers<ExtractProps<T>> &
	ControllerCallbackHandlers<ExtractCallbacks<T>> &
	ControllerListeners<ExtractListeners<T>> &
	ControllerMethods<ExtractMethods<T>> &
	ControllerRefSetters<ExtractRefs<T>>;
