import type { EventEmitter } from '@stencil/core';

type Callback<T> = (value?: T) => void;

type ComponentCallbacks<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: Callbacks[K];
};

export type ComponentInterface<RenderProps> = {
	[K in keyof RenderProps]: RenderProps[K];
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

type ComponentOwnWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: Callback<Props[K]>;
};

type ComponentDelegateWatchers<Props> = {
	[K in keyof Props as `delegateWatch${Capitalize<string & K>}`]: Callback<Props[K]>;
};

export type WebComponentInterface<Props, State, Emitters> = ComponentProps<Props> & State & WebComponentEmitters<Emitters> & ComponentDelegateWatchers<Props>;

export type FunctionalComponentProps<DelegatedProps, OwnProps, Callbacks, Emitters, Refs> = DelegatedProps &
	OwnProps &
	ComponentCallbacks<Callbacks> &
	FunctionalComponentEmitters<Emitters> &
	ComponentRefs<Refs>;

type ControllerCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: (element?: Callbacks[K]) => void;
};

type ControllerRefSetters<Refs> = {
	[K in keyof Refs as `set${Capitalize<string & K>}Ref`]: (element?: Refs[K]) => void;
};

export type ControllerInterface<DelegatedProps, OwnProps, Callbacks, Refs> = ControllerCallbackHandlers<Callbacks> &
	ControllerRefSetters<Refs> &
	ComponentDelegateWatchers<DelegatedProps> &
	ComponentOwnWatchers<OwnProps>;
