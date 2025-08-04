import type { EventEmitter } from '@stencil/core';

type Callback<T> = (value?: T) => void;

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

export type WebComponentInterface<
	Props = Record<never, never>,
	States = Record<never, never>,
	Emitters = Record<never, never>,
	Methods = Record<never, never>,
	Listeners = Record<never, never>,
> = {
	componentWillLoad(): void;
} & ComponentProps<Props> &
	NotNullableFields<States> &
	ComponentWatchers<Props> &
	WebComponentEmitters<Emitters> &
	ComponentMethods<Methods> &
	ComponentListeners<Listeners>;

export type FunctionalComponentProps<
	Props = Record<never, never>,
	States = Record<never, never>,
	Callbacks = Record<never, never>,
	Emitters = Record<never, never>,
	Refs = Record<never, never>,
> = NotNullableFields<Props> & NotNullableFields<States> & ComponentCallbacks<Callbacks> & ComponentRefs<Refs> & FunctionalComponentEmitters<Emitters>;

type ControllerCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: (element?: Callbacks[K]) => void;
};

type ControllerRefSetters<Refs> = {
	[K in keyof Refs as `set${Capitalize<string & K>}Ref`]: (element?: Refs[K]) => void;
};

type ControllerListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

type ControllerMethods<Methods> = {
	[K in keyof Methods]: Methods[K];
};

export type ControllerInterface<
	Props = Record<never, never>,
	States = Record<never, never>,
	Callbacks = Record<never, never>,
	Refs = Record<never, never>,
	Methods = Record<never, never>,
	Listeners = Record<never, never>,
> = {
	componentWillLoad(props: NotNullableFields<Props>): void;
	getProps(): NotNullableFields<Props>;
} & NotNullableFields<States> &
	ComponentWatchers<Props> &
	ControllerCallbackHandlers<Callbacks> &
	ControllerRefSetters<Refs> &
	ControllerMethods<Methods> &
	ControllerListeners<Listeners>;
