import { Log } from '../../../../../../schema';

/**
 * Definiert einen Prop-Typ mit internem und externem Typ.
 *
 * - TExternal: der externe Eingabe-Typ (Web Component), default = TInternal
 * - TInternal: der normalisierte Typ (Controller/FC)
 * - K: der Property-Name
 *
 * Phantom-Keys `__input_${K}` tragen den externen Typ auf Type-Ebene.
 */
export type Prop<TExternal, TInternal = TExternal, K extends string = 'value'> = {
	[P in K]: TInternal;
} & {
	[P in K as `__input_${P}`]?: TExternal;
};

/**
 * Shorthand für Props, bei denen externer und interner Typ identisch sind.
 * Vermeidet redundante Angabe beider Typ-Parameter.
 */
export type SimpleProp<T, K extends string = 'value'> = Prop<T, T, K>;

export type PropDefinition<TExternal, TInternal = TExternal> = {
	normalize: (value: TExternal | undefined) => TInternal | null;
	validate: (value: TInternal) => boolean;
};

export function createPropDefinition<TExternal, TInternal = TExternal>(
	normalize: (value: TExternal | undefined) => TInternal | never,
	validate: (value: TInternal) => boolean,
): PropDefinition<TExternal, TInternal> {
	return {
		normalize,
		validate,
	};
}

export function withValidPropValue<TExternal, TInternal = TExternal>(
	propDef: PropDefinition<TExternal, TInternal>,
	value: TExternal | undefined,
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
