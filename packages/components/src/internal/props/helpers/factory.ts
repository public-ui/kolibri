import { cloneDeep, isObject } from 'lodash-es';
import { devWarning } from '../../../schema';
import { normalizeCallbacksObject } from './normalizers';

function safeStringify(value: unknown): string {
	try {
		return JSON.stringify(value);
	} catch {
		return '[unserializable]';
	}
}

/**
 * Logs a visible developer warning for an invalid property value. Invalid values are
 * ignored (the render prop keeps its previous or default value), matching the behavior
 * of the legacy `watchValidator` based validation — but visibly instead of silently.
 */
function warnInvalidValue(propName: string, value: unknown, cause?: unknown): void {
	const reason = cause instanceof Error ? ` (${cause.message})` : '';
	devWarning(`The property value ${safeStringify(value)} for '${propName}' is not valid${reason}. The value is ignored.`);
}

/**
 * Definiert einen Prop-Typ mit internem und externem Typ.
 *
 * - K: der Property-Name
 * - TExternal: der externe Eingabe-Typ (Web Component)
 * - TInternal: der normalisierte Typ (Controller/FC), default = TExternal
 *
 * Phantom-Keys `__input_${K}` tragen den externen Typ auf Type-Ebene.
 * Der feste Phantom-Key `__propInternal__` trägt TInternal für eine zuverlässige Inferenz.
 */
export type Prop<K extends string, TExternal, TInternal> = {
	[P in K]: TInternal;
} & {
	[P in K as `__input_${P}`]?: TExternal;
} & {
	readonly __propInternal__?: TInternal;
};

/**
 * Shorthand for Prop when external and internal types are identical.
 *
 * - K: der Property-Name
 * - T: der Typ (verwendet für externe und interne Nutzung)
 */
export type SimpleProp<K extends string, T> = Prop<K, T, T>;

export type InternalPropValue<P extends Prop<string, unknown, unknown>> = NonNullable<P['__propInternal__']>;

export type ExtractPropKey<P extends Prop<string, unknown, unknown>> =
	Exclude<
		keyof P,
		| keyof {
				__propInternal__: unknown;
		  }
		| `__input_${string}`
	> extends infer K extends string
		? K
		: never;

/**
 * Options for prop definitions, including optional hint callbacks for developer guidance.
 *
 * Requiredness is deliberately NOT an option here: it is a property of the component, not of the
 * value's functionality. The props config slot (`required`/`optional` array) decides, and the
 * applying component passes the result to `apply` as its third argument.
 */
export type PropDefinitionOptions<T = unknown> = {
	/**
	 * Optional callback for emitting developer hints after successful validation.
	 * Called with the property name and the normalized value.
	 * Useful for accessibility and UX guidance (e.g., label length warnings).
	 */
	hints?: (propName: string, value: T) => void;
};

export type PropDefinition<TInternal, P extends Prop<string, unknown, unknown> = Prop<string, unknown, TInternal>> = {
	readonly __phantomProp__?: P;
	readonly propName: string;
	getDefaultValue(): TInternal | undefined;
	normalize: (value: unknown) => TInternal | never;
	validate: (value: TInternal) => boolean;
	apply: (value: unknown, callback: (normalized: TInternal) => void, required?: boolean) => void;
};

/**
 * A prop definition created with a default value: `getDefaultValue` is guaranteed non-undefined,
 * so callers read the fallback without assertions — the default contract is typed, not asserted.
 * `Omit` replaces the nullable signature instead of intersecting it (an intersection of the two
 * method types would keep the `| undefined` overload).
 */
export type PropDefinitionWithDefault<TInternal, P extends Prop<string, unknown, unknown> = Prop<string, unknown, TInternal>> = Omit<
	PropDefinition<TInternal, P>,
	'getDefaultValue'
> & {
	getDefaultValue(): TInternal;
};

export function createPropDefinition<P extends Prop<string, unknown, unknown>, K extends ExtractPropKey<P> = ExtractPropKey<P>>(
	propName: K,
	defaultValue: InternalPropValue<P>,
	normalize: (value: unknown) => InternalPropValue<P> | never,
	validate?: (value: InternalPropValue<P>) => boolean,
	options?: PropDefinitionOptions<InternalPropValue<P>>,
): PropDefinitionWithDefault<InternalPropValue<P>, P>;
export function createPropDefinition<P extends Prop<string, unknown, unknown>, K extends ExtractPropKey<P> = ExtractPropKey<P>>(
	propName: K,
	defaultValue: undefined,
	normalize: (value: unknown) => InternalPropValue<P> | never,
	validate?: (value: InternalPropValue<P>) => boolean,
	options?: PropDefinitionOptions<InternalPropValue<P>>,
): PropDefinition<InternalPropValue<P>, P>;
export function createPropDefinition<P extends Prop<string, unknown, unknown>, K extends ExtractPropKey<P> = ExtractPropKey<P>>(
	propName: K,
	/**
	 * The fallback applied when a value is undefined or null. Pass undefined deliberately for
	 * props without a meaningful fallback: unset values then flow through as "not set" — there is
	 * no fallback to validate, requiredness still warns via the config slot.
	 */
	defaultValue: InternalPropValue<P> | undefined,
	normalize: (value: unknown) => InternalPropValue<P> | never,
	validate: (value: InternalPropValue<P>) => boolean = () => true,
	options?: PropDefinitionOptions<InternalPropValue<P>>,
): PropDefinition<InternalPropValue<P>, P> {
	return {
		propName,
		getDefaultValue: isObject(defaultValue) ? () => cloneDeep(defaultValue) : () => defaultValue,
		normalize,
		validate,
		apply(value, callback, required) {
			if (value === undefined || value === null) {
				if (required) {
					devWarning(`The required property '_${propName}' did not receive a value. The default value is used instead.`);
				}
				if (defaultValue === undefined) {
					// No default means "not set": nothing to validate, the callback receives the unset
					// state. The cast is the single place bridging the unset state into the typed
					// callback — the store's honest "unset" typing is the concern of the config (#11435).
					callback(undefined as unknown as InternalPropValue<P>);
					return;
				}
				const fallback = this.getDefaultValue() as InternalPropValue<P>; // cloneDeep for objects; undefined is ruled out above
				if (this.validate(fallback)) {
					callback(fallback);
				} else {
					throw new Error(`Default value ${safeStringify(defaultValue)} is invalid for prop definition '${propName}'.`);
				}
				return;
			}
			try {
				const normalized = this.normalize(value);
				if (this.validate(normalized)) {
					// Call hints after successful validation
					options?.hints?.(this.propName, normalized);
					callback(normalized);
				} else {
					warnInvalidValue(propName, value);
				}
			} catch (error) {
				warnInvalidValue(propName, value, error);
			}
		},
	};
}

export type DependentPropDefinition<TInternal, TDeps, P extends Prop<string, unknown, unknown> = Prop<string, unknown, TInternal>> = {
	readonly __phantomProp__?: P;
	readonly propName: string;
	getDefaultValue(): TInternal | undefined;
	normalize: (value: unknown, deps: TDeps) => TInternal | never;
	validate: (value: TInternal, deps: TDeps) => boolean;
	apply: (value: unknown, callback: (normalized: TInternal) => void, deps: TDeps) => void;
};

/**
 * A dependent prop definition created with a default value: `getDefaultValue` is guaranteed
 * non-undefined, so callers read the fallback without assertions — the default contract is typed,
 * not asserted. `Omit` replaces the nullable signature instead of intersecting it (an intersection
 * of the two method types would keep the `| undefined` overload).
 */
export type DependentPropDefinitionWithDefault<TInternal, TDeps, P extends Prop<string, unknown, unknown> = Prop<string, unknown, TInternal>> = Omit<
	DependentPropDefinition<TInternal, TDeps, P>,
	'getDefaultValue'
> & {
	getDefaultValue(): TInternal;
};

export function createDependentPropDefinition<P extends Prop<string, unknown, unknown>, TDeps = unknown>(
	propName: ExtractPropKey<P>,
	defaultValue: InternalPropValue<P>,
	normalize: (value: unknown, deps: TDeps) => InternalPropValue<P> | never,
	validate?: (value: InternalPropValue<P>, deps: TDeps) => boolean,
	options?: PropDefinitionOptions<InternalPropValue<P>>,
): DependentPropDefinitionWithDefault<InternalPropValue<P>, TDeps, P>;
export function createDependentPropDefinition<P extends Prop<string, unknown, unknown>, TDeps = unknown>(
	propName: ExtractPropKey<P>,
	defaultValue: undefined,
	normalize: (value: unknown, deps: TDeps) => InternalPropValue<P> | never,
	validate?: (value: InternalPropValue<P>, deps: TDeps) => boolean,
	options?: PropDefinitionOptions<InternalPropValue<P>>,
): DependentPropDefinition<InternalPropValue<P>, TDeps, P>;
export function createDependentPropDefinition<P extends Prop<string, unknown, unknown>, TDeps = unknown>(
	propName: ExtractPropKey<P>,
	defaultValue: InternalPropValue<P> | undefined,
	normalize: (value: unknown, deps: TDeps) => InternalPropValue<P> | never,
	validate: (value: InternalPropValue<P>, deps: TDeps) => boolean = () => true,
	options?: PropDefinitionOptions<InternalPropValue<P>>,
): DependentPropDefinition<InternalPropValue<P>, TDeps, P> {
	return {
		propName,
		getDefaultValue: isObject(defaultValue) ? () => cloneDeep(defaultValue) : () => defaultValue,
		normalize,
		validate,
		apply(value, callback, deps: TDeps) {
			if (value === undefined || value === null) {
				if (defaultValue === undefined) {
					callback(undefined as unknown as InternalPropValue<P>);
					return;
				}
				const fallback = this.getDefaultValue() as InternalPropValue<P>; // cloneDeep for objects; undefined is ruled out above
				if (this.validate(fallback, deps)) {
					callback(fallback);
				} else {
					throw new Error(
						`Default value ${safeStringify(defaultValue)} is invalid for prop definition '${propName}' with dependencies ${safeStringify(deps)}.`,
					);
				}
				return;
			}
			try {
				const normalized = this.normalize(value, deps);
				if (this.validate(normalized, deps)) {
					// Call hints after successful validation
					options?.hints?.(this.propName, normalized);
					callback(normalized);
				} else {
					warnInvalidValue(propName, value);
				}
			} catch (error) {
				warnInvalidValue(propName, value, error);
			}
		},
	};
}

/**
 * Creates the prop definition for an `_on` callbacks object.
 *
 * Every component that exposes callbacks normalizes them identically: `apply` already handles
 * `undefined`/`null` by falling back to the default `{}`, so the normalizer only has to verify
 * that a non-null value is an object (`normalizeCallbacksObject`). This factory holds that one
 * implementation; callers bind it to their own callback type (`collapsibleCallbacksProp`,
 * `buttonCallbacksProp`, …).
 */
export function createCallbacksPropDefinition<T extends object>(): PropDefinition<T, SimpleProp<'on', T>> {
	return createPropDefinition<SimpleProp<'on', T>>('on', {} as T, (value) => normalizeCallbacksObject<T>(value));
}
