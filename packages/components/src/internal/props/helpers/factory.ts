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

export type PropDefinition<TInternal> = {
	normalize: (value: unknown) => TInternal | never;
	validate: (value: TInternal) => boolean;
};

export function createPropDefinition<P extends Prop<string, unknown, unknown>>(
	normalize: (value: unknown) => InternalPropValue<P> | never,
	validate: (value: InternalPropValue<P>) => boolean = () => true,
): PropDefinition<InternalPropValue<P>> {
	return {
		normalize,
		validate,
	};
}

export function withValidPropValue<P extends Prop<string, unknown, unknown>>(
	propDef: PropDefinition<InternalPropValue<P>>,
	value: unknown,
	callback: (normalized: InternalPropValue<P>) => void,
): void {
	try {
		const normalized = propDef.normalize(value);
		if (propDef.validate(normalized)) {
			callback(normalized);
		}
	} catch (e) {
		Log.debug(e);
	}
}
