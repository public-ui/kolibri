export type Prop<T, K extends string = 'value'> = {
	[P in K]: T;
};

export type PropDefinition<P extends Prop<unknown, string>> = {
	normalize: (value?: unknown) => unknown;
	validate: (value: unknown) => value is P extends Prop<infer T, string> ? T : never;
};

export function createPropDefinition<P extends Prop<unknown, string>>(
	normalize: (value?: unknown) => unknown,
	validate: (value: unknown) => value is P extends Prop<infer T, string> ? T : never,
): PropDefinition<P> {
	return {
		normalize,
		validate,
	};
}
