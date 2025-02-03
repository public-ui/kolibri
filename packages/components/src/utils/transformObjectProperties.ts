/**
 * Transforms keys with leading underscores, keeping non-underscore keys unchanged.
 *
 * @template K The original key type
 * @returns Transformed key type
 */
type TransformKeys<K> = K extends `_${infer Rest}` ? Rest : K;

/**
 * Transforms object properties by removing leading underscores from key names.
 *
 * This method is useful for converting objects from a naming convention with leading underscores
 * (often used for private or internal properties) to a standard naming format.
 *
 * @param obj The input object with potential underscore prefixes
 * @returns A new object with underscores removed from key names
 *
 * @example
 * // Converts object with underscore-prefixed keys
 * const input = { _name: 'John', _age: 30 };
 * const result = transformObjectProperties(input);
 * // result is { name: 'John', age: 30 }
 */
export function transformObjectProperties<T extends Record<string, unknown>>(
	obj: T,
): {
	[K in keyof T as TransformKeys<K>]: T[K];
} {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => {
			const newKey = key.startsWith('_') ? key.slice(1) : key;
			return {
				...acc,
				[newKey]: value,
			};
		},
		{} as {
			[K in keyof T as TransformKeys<K>]: T[K];
		},
	);
}
