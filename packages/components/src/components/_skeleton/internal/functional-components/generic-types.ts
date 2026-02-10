import type { EventEmitter } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

type Callback<T> = (value?: T) => void;

/**
 * Extracts the internal (normalized) property types by filtering out __input_* phantom keys.
 */
export type InternalOf<P> = {
	[K in keyof P as K extends `__input_${string}` ? never : K]: P[K];
};

/**
 * Extracts the external (input) property types.
 * For each real key K, uses the __input_K type if present, otherwise falls back to the internal type.
 */
type ExternalOf<P> = {
	[K in keyof P as K extends `__input_${string}` ? never : K]: `__input_${K & string}` extends keyof P ? NonNullable<P[`__input_${K & string}`]> : P[K];
};

type PropsDefinition = {
	Optional?: Record<string, unknown>;
	Required?: Record<string, unknown>;
};

type PropsOrDefault<T extends ComponentApi> = T['Props'] extends PropsDefinition ? T['Props'] : PropsDefinition;

type ExtractDefinitionEntry<Definition extends PropsDefinition, K extends keyof PropsDefinition> =
	Definition[K] extends Record<string, unknown> ? Definition[K] : Record<never, never>;

type ExtractPropsDefinition<T extends ComponentApi> = PropsOrDefault<T>;

type ExtractRequiredProps<T extends ComponentApi> = ExtractDefinitionEntry<ExtractPropsDefinition<T>, 'Required'>;

type ExtractOptionalProps<T extends ComponentApi> = ExtractDefinitionEntry<ExtractPropsDefinition<T>, 'Optional'>;

type ExtractAllProps<T extends ComponentApi> = ExtractRequiredProps<T> & ExtractOptionalProps<T>;

/**
 * Resolved internal prop types (normalized).
 * Required props are mandatory, optional props are Partial.
 */
export type ResolvedProps<T extends ComponentApi> = InternalOf<ExtractRequiredProps<T>> & Partial<InternalOf<ExtractOptionalProps<T>>>;

/**
 * Resolved external/input prop types (before normalization).
 * Used for componentWillLoad and watchers.
 */
export type ResolvedInputProps<T extends ComponentApi> = ExternalOf<ExtractRequiredProps<T>> & Partial<ExternalOf<ExtractOptionalProps<T>>>;

export interface ComponentApi {
	Props?: PropsDefinition;
	States?: Record<string, unknown>;
	Emitters?: Record<string, unknown>;
	Methods?: Record<string, () => unknown>;
	Listeners?: Record<string, unknown>;
	Callbacks?: Record<string, () => unknown>;
	Refs?: Record<string, HTMLElement>;
}

type Extract<T extends ComponentApi, K extends keyof ComponentApi> = T[K] extends Record<string, unknown> ? T[K] : Record<never, never>;

type ExtractStates<T extends ComponentApi> = InternalOf<Extract<T, 'States'>>;
type ExtractEmitters<T extends ComponentApi> = Extract<T, 'Emitters'>;
type ExtractMethods<T extends ComponentApi> = Extract<T, 'Methods'>;
type ExtractListeners<T extends ComponentApi> = Extract<T, 'Listeners'>;
type ExtractCallbacks<T extends ComponentApi> = Extract<T, 'Callbacks'>;
type ExtractRefs<T extends ComponentApi> = Extract<T, 'Refs'>;

type ExtractInternalProps<T extends ComponentApi> = InternalOf<ExtractAllProps<T>>;
type ExtractExternalProps<T extends ComponentApi> = ExternalOf<ExtractAllProps<T>>;

type ComponentCallbacks<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: Callbacks[K];
};

type WebComponentEmitters<Emitters> = {
	[K in keyof Emitters as `${Lowercase<string & K>}`]: EventEmitter<Emitters[K]>;
};

type FunctionalComponentEmitters<Emitters> = {
	[K in keyof Emitters as `on${Capitalize<string & K>}`]: EventEmitter<Emitters[K]>;
};

type ComponentPropsRequired<Props> = {
	[K in keyof Props as `_${Lowercase<string & K>}`]: Props[K];
};

type ComponentPropsOptional<Props> = {
	[K in keyof Props as `_${Lowercase<string & K>}`]?: Props[K];
};

type ComponentProps<T extends ComponentApi> = ComponentPropsRequired<ExternalOf<ExtractRequiredProps<T>>> &
	ComponentPropsOptional<ExternalOf<ExtractOptionalProps<T>>>;

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

export type WebComponentInterface<T extends ComponentApi> = {
	componentWillLoad(): void;
} & ComponentProps<T> &
	NotNullableFields<ExtractStates<T>> &
	ComponentWatchers<ExtractExternalProps<T>> &
	WebComponentEmitters<ExtractEmitters<T>> &
	ComponentMethods<ExtractMethods<T>> &
	ComponentListeners<ExtractListeners<T>>;

export type FunctionalComponentProps<T extends ComponentApi> = NotNullableFields<ExtractInternalProps<T>> &
	NotNullableFields<ExtractStates<T>> &
	ComponentCallbacks<ExtractCallbacks<T>> &
	ComponentRefs<ExtractRefs<T>> &
	FunctionalComponentEmitters<ExtractEmitters<T>> &
	Partial<JSXBase.HTMLAttributes<HTMLElement>>;

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
	componentWillLoad(props: ResolvedInputProps<T>): void;
	getProps(): NotNullableFields<ExtractInternalProps<T>>;
} & ComponentWatchers<ExtractExternalProps<T>> &
	ControllerCallbackHandlers<ExtractCallbacks<T>> &
	ControllerListeners<ExtractListeners<T>> &
	ControllerMethods<ExtractMethods<T>> &
	ControllerRefSetters<ExtractRefs<T>>;
