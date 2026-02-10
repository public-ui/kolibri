import { Log } from '../../../../../../schema';

export type Prop<T, K extends string = 'value'> = {
	[P in K]: T;
};

export type PropValue<P extends Prop<unknown, string>> = P extends Prop<infer T, string> ? T : never;

export type PropDefinition<P extends Prop<unknown, string>> = {
	normalize: (value: unknown) => PropValue<P> | null;
	validate: (value: PropValue<P>) => boolean;
};

export function createPropDefinition<P extends Prop<unknown, string>>(
	normalize: (value?: unknown) => PropValue<P> | never,
	validate: (value: PropValue<P>) => boolean,
): PropDefinition<P> {
	return {
		normalize,
		validate,
	};
}

export function withValidPropValue<P extends Prop<unknown, string>>(
	propDef: PropDefinition<P>,
	value: PropValue<P> | undefined,
	callback: (normalized: PropValue<P>) => void,
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
