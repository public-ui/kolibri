import type { Prop } from '../props';

/**
 * Framework-neutral subset of the JSX HTML attributes that functional-component props forward as
 * rest attributes. Replaces the Stencil `JSXBase.HTMLAttributes` import so that internals stays
 * free of framework type dependencies; the runtime packages keep their own richer JSX types.
 * The key set must stay explicit: an index signature collapses `keyof` to `string` and the
 * `Omit` in `FunctionalComponentExtras` would erase the whole attribute type.
 */
export type KolibriHTMLAttributes = {
	accessKey?: string;
	'aria-controls'?: string;
	'aria-current'?: string | boolean;
	'aria-describedby'?: string;
	'aria-details'?: string;
	'aria-expanded'?: boolean;
	'aria-haspopup'?: boolean;
	'aria-hidden'?: boolean;
	'aria-invalid'?: boolean | string;
	'aria-keyshortcuts'?: string;
	'aria-label'?: string;
	'aria-labelledby'?: string;
	'aria-level'?: number;
	'aria-live'?: 'off' | 'polite' | 'assertive';
	'aria-selected'?: boolean;
	class?: string;
	dir?: string;
	hidden?: boolean | 'until-found';
	id?: string;
	lang?: string;
	onClick(event: MouseEvent): void;
	onFocus(event: FocusEvent): void;
	onBlur(event: FocusEvent): void;
	onKeyDown(event: KeyboardEvent): void;
	onKeyUp(event: KeyboardEvent): void;
	onMouseDown(event: MouseEvent): void;
	onMouseEnter(event: MouseEvent): void;
	onMouseLeave(event: MouseEvent): void;
	part?: string;
	role?: string;
	slot?: string;
	style?: { [key: string]: string | undefined };
	tabIndex?: number;
	title?: string;
};

/**
 * Structural counterpart of the Stencil `EventEmitter`, so internals can type emitter members
 * without importing the framework.
 */
export type EventEmitter<T> = {
	emit: (value?: T) => Promise<void>;
};

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
 * Only the `undefined` of the optional phantom key is removed: an external type that allows `null`
 * (e.g. the `_value` of `kol-input-number`) keeps it.
 */
type ExternalOf<P> = {
	[K in keyof P as K extends `__input_${string}` | '__propInternal__' ? never : K]: `__input_${K & string}` extends keyof P
		? Exclude<P[`__input_${K & string}`], undefined>
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
	Callbacks?: Record<string, (...args: never[]) => unknown>;
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

type ExternalProps<T extends ComponentApi> = ExternalOf<AllProps<T>>;

// ============================================================================
// State Access Functions
// ============================================================================

/**
 * Function signature for setting component state in a type-safe manner.
 * Used by web components and behaviors to update reactive @State fields with generic type safety.
 */
export type SetStateFn<Api extends ComponentApi> = <K extends keyof InternalOf<NonNullable<Api['States']>>>(
	key: K,
	value: InternalOf<NonNullable<Api['States']>>[K],
) => void;

/**
 * Function signature for reading component state in a type-safe manner.
 * Used by web components and behaviors to access reactive @State fields with generic type safety.
 */
export type GetStateFn<Api extends ComponentApi> = <K extends keyof InternalOf<NonNullable<Api['States']>>>(
	key: K,
) => InternalOf<NonNullable<Api['States']>>[K];

/**
 * Bundles setState and getState as a single unit.
 * Behaviors receive this as their state access mechanism — either a real
 * implementation from a web component or `BaseWebComponent.stateLess` for
 * behaviors that manage state purely via render props.
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

/**
 * Maps each prop key to the public web component prop name `_<key>`.
 * The original casing is preserved: the documented camelCase name (e.g. `_secondaryHeadline`)
 * must stay type-safe, and keys differing only in case would collide under a Lowercase mapping.
 */
type ComponentPropsRequired<Props> = {
	[K in keyof Props as `_${string & K}`]: Props[K];
};

type ComponentPropsOptional<Props> = {
	[K in keyof Props as `_${string & K}`]?: Props[K];
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

/**
 * The parts of an FC's props that the props config does not define: callbacks, refs and emitters,
 * and the HTML attributes no prop owns.
 */
type FunctionalComponentExtras<T extends ComponentApi> = ComponentCallbacks<ExtractCallbacks<T>> &
	ComponentRefs<ExtractRefs<T>> &
	FunctionalComponentEmitters<ExtractEmitters<T>> &
	Partial<Omit<KolibriHTMLAttributes, keyof ResolvedProps<T> | keyof ExtractStates<T>>>;

/**
 * The input contract of a functional component.
 * Required props are mandatory, optional props may be omitted: `undefined` means "not set" and
 * resolves to the prop's configured default (see `resolveFcProps`).
 */
export type FunctionalComponentProps<T extends ComponentApi> = ResolvedProps<T> & StrictFields<ExtractStates<T>> & FunctionalComponentExtras<T>;

/**
 * The strict view a functional component's render body may dereference: every optional prop is
 * replaced by its configured default. Produced by `resolveFcProps`.
 */
export type ResolvedFunctionalComponentProps<T extends ComponentApi> = StrictFields<ResolvedProps<T>> &
	StrictFields<ExtractStates<T>> &
	FunctionalComponentExtras<T>;

// ============================================================================
// Behavior Types
// ============================================================================

type BehaviorCallbackHandlers<Callbacks> = {
	[K in keyof Callbacks as `handle${Capitalize<string & K>}`]: Callbacks[K];
};

type BehaviorListeners<Listeners> = {
	[K in keyof Listeners as `on${Capitalize<string & K>}`]: (event: Listeners[K]) => void;
};

export type BehaviorInterface<T extends ComponentApi = ComponentApi> = {
	componentWillLoad(props: ResolvedInputProps<T>): void;
	getRenderProp<K extends keyof ResolvedProps<T>>(key: K): StrictFields<ResolvedProps<T>>[K];
} & ComponentWatchers<ExternalProps<T>> &
	BehaviorCallbackHandlers<ExtractCallbacks<T>> &
	BehaviorListeners<ExtractListeners<T>>;
