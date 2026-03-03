import { Log } from '../../../schema';

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

export type PropDefinition<TInternal, TDeps = Record<string, never>> = {
	normalize: (value: unknown, deps: TDeps) => TInternal | never;
	validate: (value: TInternal, deps: TDeps) => boolean;
	apply: (value: unknown, callback: (normalized: TInternal) => void, deps?: TDeps) => void;
};

export function createPropDefinition<P extends Prop<string, unknown, unknown>, TDeps = Record<string, never>>(
	normalize: (value: unknown, deps: TDeps) => InternalPropValue<P> | never,
	validate: (value: InternalPropValue<P>, deps: TDeps) => boolean = () => true,
): PropDefinition<InternalPropValue<P>, TDeps> {
	return {
		normalize,
		validate,
		apply(value, callback, deps) {
			try {
				const dependencies = deps ?? ({} as TDeps);
				const normalized = this.normalize(value, dependencies);
				if (this.validate(normalized, dependencies)) {
					callback(normalized);
				}
			} catch (e) {
				Log.debug(e);
			}
		},
	};
}
