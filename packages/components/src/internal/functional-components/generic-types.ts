import type { EventEmitter } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

import type { Prop } from '../props';

// ============================================================================
// Utility Types
// ============================================================================

type Callback<T> = (value?: T) => void;

/** Makes all fields required and non-nullable. */
export type StrictFields<T> = {
	[K in keyof T]-?: NonNullable<T[K]>;
};

type UnionToIntersection<U> = (U extends unknown ? (arg: U) => void : never) extends (arg: infer I) => void ? I : never;

// ============================================================================
// Phantom Key Mapping (__input_* convention)
// ============================================================================

/**
 * Extracts the internal (normalized) property types by filtering out __input_* and __propInternal__ phantom keys.
 */
export type InternalOf<P> = {
	[K in keyof P as K extends `__input_${string}` | '__propInternal__' ? never : K]: P[K];
};

/**
 * Extracts the external (input) property types.
 * For each real key K, uses the __input_K type if present, otherwise falls back to the internal type.
 */
type ExternalOf<P> = {
	[K in keyof P as K extends `__input_${string}` | '__propInternal__' ? never : K]: `__input_${K & string}` extends keyof P
		? NonNullable<P[`__input_${K & string}`]>
		: P[K];
};

// ============================================================================
// Component API Definition
// ============================================================================

type PropsDefinition = {
	Optional?: Record<string, unknown>;
	Required?: Record<string, unknown>;
};

export interface ComponentApi {
	Callbacks?: Record<string, () => unknown>;
	Emitters?: Record<string, unknown>;
	Listeners?: Record<string, unknown>;
	Methods?: Record<string, (...args: never[]) => unknown>;
	Props?: PropsDefinition;
	Refs?: Record<string, HTMLElement>;
	States: Record<never, never>;
}

// ============================================================================
// Props Config (Single Source of Truth)
// ============================================================================

/** Any prop definition that carries a phantom Prop type, a propName and a getDefaultValue method. */
type AnyPropDef = {
	readonly __phantomProp__?: Prop<string, unknown, unknown>;
	readonly propName: string;
	getDefaultValue(): unknown;
};

/** Extracts the phantom Prop type from a PropDefinition or DependentPropDefinition. */
type ExtractPhantomProp<D> = D extends { readonly __phantomProp__?: infer P extends Prop<string, unknown, unknown> } ? P : never;

/** Merges an array of prop definitions into a single intersection of their phantom Prop types. */
type MergePropsFromArray<A extends readonly AnyPropDef[]> = UnionToIntersection<ExtractPhantomProp<A[number]>>;

/** Shape for a props config object with arrays of runtime prop definitions. */
export type PropsConfigShape = {
	optional?: readonly AnyPropDef[];
	required?: readonly AnyPropDef[];
};

/**
 * Derives a full ComponentApi type from a runtime props config and optional extra fields.
 *
 * Usage:
 * ```ts
 * const config = {
 *   required: [maxProp, clampedNumberValueProp],
 *   optional: [labelProp],
 * } as const satisfies PropsConfigShape;
 *
 * type MyApi = ApiFromConfig<typeof config, { States: { liveValue: number } }>;
 * ```
 */
export type ApiFromConfig<Config extends PropsConfigShape, Extra extends Partial<Omit<ComponentApi, 'Props'>> = Record<never, never>> = {
	Props: {
		Optional: Config['optional'] extends readonly AnyPropDef[] ? MergePropsFromArray<Config['optional']> : Record<never, never>;
		Required: Config['required'] extends readonly AnyPropDef[] ? MergePropsFromArray<Config['required']> : Record<never, never>;
	};
	States: Extra extends { States: infer S extends Record<string, unknown> } ? S : Record<never, never>;
} & Omit<Extra, 'Props' | 'States'>;

// ============================================================================
// Props Extraction
// ============================================================================

/** Safely extracts a sub-record from a ComponentApi's Props definition, defaulting to an empty record. */
type PropsEntry<T extends ComponentApi, K extends keyof PropsDefinition> = T['Props'] extends PropsDefinition
	? T['Props'][K] extends Record<string, unknown>
		? T['Props'][K]
		: Record<never, never>
	: Record<never, never>;

type RequiredProps<T extends ComponentApi> = PropsEntry<T, 'Required'>;
type OptionalProps<T extends ComponentApi> = PropsEntry<T, 'Optional'>;
type AllProps<T extends ComponentApi> = RequiredProps<T> & OptionalProps<T>;

/**
 * Resolved internal prop types (normalized).
 * Required props are mandatory, optional props are Partial.
 */
export type ResolvedProps<T extends ComponentApi> = InternalOf<RequiredProps<T>> & Partial<InternalOf<OptionalProps<T>>>;

/**
 * Resolved external/input prop types (before normalization).
 * Used for componentWillLoad and watchers.
 */
export type ResolvedInputProps<T extends ComponentApi> = ExternalOf<RequiredProps<T>> & Partial<ExternalOf<OptionalProps<T>>>;

// ============================================================================
// API Field Extraction
// ============================================================================

/** Safely extracts a top-level field from a ComponentApi, defaulting to an empty record. */
type ApiField<T extends ComponentApi, K extends keyof ComponentApi> = T[K] extends Record<string, unknown> ? T[K] : Record<never, never>;

type ExtractCallbacks<T extends ComponentApi> = ApiField<T, 'Callbacks'>;
type ExtractEmitters<T extends ComponentApi> = ApiField<T, 'Emitters'>;
type ExtractListeners<T extends ComponentApi> = ApiField<T, 'Listeners'>;
type ExtractMethods<T extends ComponentApi> = ApiField<T, 'Methods'>;
type ExtractRefs<T extends ComponentApi> = ApiField<T, 'Refs'>;
type ExtractStates<T extends ComponentApi> = InternalOf<ApiField<T, 'States'>>;

type InternalProps<T extends ComponentApi> = InternalOf<AllProps<T>>;
type ExternalProps<T extends ComponentApi> = ExternalOf<AllProps<T>>;

// ============================================================================
// State Access Functions
// ============================================================================

/**
 * Function signature for setting component state in a type-safe manner.
 * Used by controllers to update reactive @State fields with generic type safety.
 */
export type SetStateFn<Api extends ComponentApi> = <K extends keyof InternalOf<NonNullable<Api['States']>>>(
	key: K,
	value: InternalOf<NonNullable<Api['States']>>[K],
) => void;

/**
 * Function signature for reading component state in a type-safe manner.
 * Used by controllers to access reactive @State fields with generic type safety.
 */
export type GetStateFn<Api extends ComponentApi> = <K extends keyof InternalOf<NonNullable<Api['States']>>>(
	key: K,
) => InternalOf<NonNullable<Api['States']>>[K];

/**
 * Bundles setState and getState as a single unit.
 * Controllers receive this as their state access mechanism — either a real
 * implementation from a web component or `BaseController.stateLess` for
 * controllers that manage state purely via render props.
 */
export type StateAccess<Api extends ComponentApi> = {
	setState: SetStateFn<Api>;
	getState: GetStateFn<Api>;
};

// ============================================================================
// Method Promise Wrapping
// ============================================================================

/**
 * Wraps the return type of each method in a Promise.
 * API definitions use simple return types (e.g., `() => void`)
 * and the resolved type becomes `() => Promise<void>`.
 * Uses `Awaited<R>` for idempotency — `() => Promise<void>` stays `Promise<void>`, not `Promise<Promise<void>>`.
 */
type PromiseMethod<Methods> = {
	[K in keyof Methods]: Methods[K] extends (...args: infer A) => infer R ? (...args: A) => Promise<Awaited<R>> : Methods[K];
};

// ============================================================================
// Web Component Types
// ============================================================================

type ComponentPropsRequired<Props> = {
	[K in keyof Props as `_${Lowercase<string & K>}`]: Props[K];
};

type ComponentPropsOptional<Props> = {
	[K in keyof Props as `_${Lowercase<string & K>}`]?: Props[K];
};

type ComponentProps<T extends ComponentApi> = ComponentPropsRequired<ExternalOf<RequiredProps<T>>> & ComponentPropsOptional<ExternalOf<OptionalProps<T>>>;

type ComponentWatchers<Props> = {
	[K in keyof Props as `watch${Capitalize<string & K>}`]: Callback<Props[K]>;
};

type ComponentEmitters<Emitters> = {
	[K in keyof Emitters as `${Lowercase<string & K>}`]: EventEmitter<Emitters[K]>;
};

type ComponentListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

export type WebComponentInterface<T extends ComponentApi> = {
	componentWillLoad(): void;
} & ComponentProps<T> &
	StrictFields<ExtractStates<T>> &
	ComponentWatchers<ExternalProps<T>> &
	ComponentEmitters<ExtractEmitters<T>> &
	PromiseMethod<ExtractMethods<T>> &
	ComponentListeners<ExtractListeners<T>>;

// ============================================================================
// Functional Component Types
// ============================================================================

type ComponentCallbacks<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: Callbacks[K];
};

type ComponentRefs<Refs> = {
	[K in keyof Refs as `ref${Capitalize<string & K>}`]: (element?: Refs[K]) => void;
};

type FunctionalComponentEmitters<Emitters> = {
	[K in keyof Emitters as `on${Capitalize<string & K>}`]: EventEmitter<Emitters[K]>;
};

export type FunctionalComponentProps<T extends ComponentApi> = StrictFields<InternalProps<T>> &
	StrictFields<ExtractStates<T>> &
	ComponentCallbacks<ExtractCallbacks<T>> &
	ComponentRefs<ExtractRefs<T>> &
	FunctionalComponentEmitters<ExtractEmitters<T>> &
	Partial<Omit<JSXBase.HTMLAttributes<HTMLElement>, keyof InternalProps<T> | keyof ExtractStates<T>>>;

// ============================================================================
// Controller Types
// ============================================================================

type ControllerCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: (element?: Callbacks[K]) => void;
};

type ControllerListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

export type ControllerInterface<T extends ComponentApi = ComponentApi> = {
	componentWillLoad(props: ResolvedInputProps<T>): void;
	getRenderProp<K extends keyof InternalProps<T>>(key: K): StrictFields<InternalProps<T>>[K];
} & ComponentWatchers<ExternalProps<T>> &
	ControllerCallbackHandlers<ExtractCallbacks<T>> &
	ControllerListeners<ExtractListeners<T>> &
	ExtractMethods<T>;
