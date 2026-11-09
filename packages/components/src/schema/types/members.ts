/**
 * Schema-internal replacement for the deprecated Members type of `Generic.Element` in
 * `adopted-style-sheets`: builds the `*Props` and `*States` types of a component with the
 * underscore prefix of the public props. Structurally identical, so the exported types keep
 * their shape.
 */
export type Members<R, O> = {
	[Property in keyof R as `_${string & Property}`]: R[Property];
} & {
	[Property in keyof O as `_${string & Property}`]?: O[Property];
};
