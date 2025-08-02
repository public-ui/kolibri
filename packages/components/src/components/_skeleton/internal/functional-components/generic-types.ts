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

type ComponentWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: Callback<Props[K]>;
};

export type WebComponentInterface<State, Props = Record<never, never>, Emitters = Record<never, never>> = {
	componentWillLoad(): void;
} & ComponentProps<Props> &
	ComponentWatchers<Props> &
	State &
	WebComponentEmitters<Emitters>;

export type FunctionalComponentProps<Props, Callbacks = Record<never, never>, Emitters = Record<never, never>, Refs = Record<never, never>> = Props &
	ComponentCallbacks<Callbacks> &
	ComponentRefs<Refs> &
	FunctionalComponentEmitters<Emitters>;

type ControllerCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: (element?: Callbacks[K]) => void;
};

type ControllerRefSetters<Refs> = {
	[K in keyof Refs as `set${Capitalize<string & K>}Ref`]: (element?: Refs[K]) => void;
};

export type ControllerInterface<RenderProps, Callbacks = Record<never, never>, Refs = Record<never, never>> = {
	componentWillLoad(props: RenderProps): void;
} & ComponentWatchers<RenderProps> &
	ControllerCallbackHandlers<Callbacks> &
	ControllerRefSetters<Refs>;
