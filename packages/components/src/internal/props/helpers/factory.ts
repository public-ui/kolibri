import { Log } from '../../../schema';

function safeStringify(value: unknown): string {
	try {
		return JSON.stringify(value);
	} catch {
		return '[unserializable]';
	}
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

export type PropDefinition<TInternal, P extends Prop<string, unknown, unknown> = Prop<string, unknown, TInternal>> = {
	readonly __phantomProp__?: P;
	readonly propName: string;
	getDefaultValue(): TInternal;
	normalize: (value: unknown) => TInternal | never;
	validate: (value: TInternal) => boolean;
	apply: (value: unknown, callback: (normalized: TInternal) => void) => void;
};

export function createPropDefinition<P extends Prop<string, unknown, unknown>, K extends ExtractPropKey<P> = ExtractPropKey<P>>(
	propName: K,
	defaultValue: InternalPropValue<P>,
	normalize: (value: unknown) => InternalPropValue<P> | never,
	validate: (value: InternalPropValue<P>) => boolean = () => true,
): PropDefinition<InternalPropValue<P>, P> {
	return {
		propName,
		getDefaultValue: typeof defaultValue === 'object' && defaultValue !== null ? () => structuredClone(defaultValue) : () => defaultValue,
		normalize,
		validate,
		apply(value, callback) {
			if (value === undefined || value === null) {
				if (this.validate(defaultValue)) {
					callback(defaultValue);
				} else {
					throw new Error(`Default value ${safeStringify(defaultValue)} is invalid for prop definition '${propName}'.`);
				}
				return;
			}
			try {
				const normalized = this.normalize(value);
				if (this.validate(normalized)) {
					callback(normalized);
				}
			} catch (e) {
				Log.debug(e);
			}
		},
	};
}

export type DependentPropDefinition<TInternal, TDeps, P extends Prop<string, unknown, unknown> = Prop<string, unknown, TInternal>> = {
	readonly __phantomProp__?: P;
	readonly propName: string;
	getDefaultValue(): TInternal;
	normalize: (value: unknown, deps: TDeps) => TInternal | never;
	validate: (value: TInternal, deps: TDeps) => boolean;
	apply: (value: unknown, callback: (normalized: TInternal) => void, deps: TDeps) => void;
};

export function createDependentPropDefinition<P extends Prop<string, unknown, unknown>, TDeps = unknown>(
	propName: ExtractPropKey<P>,
	defaultValue: InternalPropValue<P>,
	normalize: (value: unknown, deps: TDeps) => InternalPropValue<P> | never,
	validate: (value: InternalPropValue<P>, deps: TDeps) => boolean = () => true,
): DependentPropDefinition<InternalPropValue<P>, TDeps, P> {
	return {
		propName,
		getDefaultValue: typeof defaultValue === 'object' && defaultValue !== null ? () => structuredClone(defaultValue) : () => defaultValue,
		normalize,
		validate,
		apply(value, callback, deps: TDeps) {
			if (value === undefined || value === null) {
				if (this.validate(defaultValue, deps)) {
					callback(defaultValue);
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
					callback(normalized);
				}
			} catch (e) {
				Log.debug(e);
			}
		},
	};
}
