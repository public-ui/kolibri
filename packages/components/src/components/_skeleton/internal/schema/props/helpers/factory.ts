import { Log } from '../../../../../../schema';

/**
 * Definiert einen Prop-Typ mit internem und externem Typ.
 *
 * - K: der Property-Name
 * - TExternal: der externe Eingabe-Typ (Web Component)
 * - TInternal: der normalisierte Typ (Controller/FC), default = TExternal
 *
 * Phantom-Keys `__input_${K}` tragen den externen Typ auf Type-Ebene.
 */
export type Prop<K extends string, TExternal, TInternal = TExternal> = {
	[P in K]: TInternal;
} & {
	[P in K as `__input_${P}`]?: TExternal;
};

/**
 * Shorthand for Prop when external and internal types are identical.
 *
 * - K: der Property-Name
 * - T: der Typ (verwendet für externe und interne Nutzung)
 */
export type SimpleProp<K extends string, T> = Prop<K, T, T>;

export type PropDefinition<TExternal, TInternal = TExternal> = {
	normalize: (value: unknown) => TInternal | never;
	validate: (value: TInternal) => boolean;
};

export function createPropDefinition<TExternal, TInternal = TExternal>(
	normalize: (value: unknown) => TInternal | never,
	validate: (value: TInternal) => boolean,
): PropDefinition<TExternal, TInternal> {
	return {
		normalize,
		validate,
	};
}

export function withValidPropValue<TExternal, TInternal = TExternal>(
	propDef: PropDefinition<TExternal, TInternal>,
	value: unknown,
	callback: (normalized: TInternal) => void,
): void {
	try {
		const normalized = propDef.normalize(value);
		if (normalized !== null && propDef.validate(normalized)) {
			callback(normalized);
		}
	} catch (e) {
		Log.debug(e);
	}
}
