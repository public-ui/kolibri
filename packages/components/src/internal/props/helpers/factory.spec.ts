import { describe, expect, it } from '@jest/globals';
import type { SimpleProp } from './factory';
import { createDependentPropDefinition, createPropDefinition } from './factory';

describe('createPropDefinition', () => {
	describe('getDefaultValue', () => {
		it('should return a fresh copy of a primitive default value', () => {
			// Primitives are immutable in JS, so this is a baseline sanity check
			// rather than a test for the defensive-copy mechanism.
			type MyProp = SimpleProp<'myProp', string>;
			const def = createPropDefinition<MyProp>('myProp', 'original', (v) => v as string);

			expect(def.getDefaultValue()).toBe('original');
		});

		it('should not allow mutation of a default value via the returned reference', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createPropDefinition<MyProp>('myProp', 'original', (v) => v as string);

			// String primitives cannot be mutated; verify the stored default remains unchanged
			void def.getDefaultValue();

			// The stored default must remain unaffected
			expect(def.getDefaultValue()).toBe('original');
		});

		it('should not allow mutation of an nested object default value via the returned reference', () => {
			type MyProp = SimpleProp<'myProp', { nested: string }>;
			const def = createPropDefinition<MyProp>('myProp', { nested: 'original' }, (v) => v as { nested: string });

			// Mutate the returned default value
			def.getDefaultValue().nested = 'mutated';

			// The stored default must remain unaffected
			expect(def.getDefaultValue()).toEqual({ nested: 'original' });
		});
	});

	describe('apply', () => {
		it('should use the default value when value is undefined', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createPropDefinition<MyProp>('myProp', 'default', (v) => v as string);

			const callback = jest.fn();
			def.apply(undefined, callback);

			expect(callback).toHaveBeenCalledWith('default');
		});

		it('should use the default value when value is null', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createPropDefinition<MyProp>('myProp', 'default', (v) => v as string);

			const callback = jest.fn();
			def.apply(null, callback);

			expect(callback).toHaveBeenCalledWith('default');
		});

		it('should normalize and apply a provided value', () => {
			type MyProp = SimpleProp<'myProp', number>;
			const def = createPropDefinition<MyProp>('myProp', 0, (v) => Number(v));

			const callback = jest.fn();
			def.apply('42', callback);

			expect(callback).toHaveBeenCalledWith(42);
		});

		it('should not call callback when validation fails for a provided value', () => {
			type MyProp = SimpleProp<'myProp', number>;
			const def = createPropDefinition<MyProp>(
				'myProp',
				0,
				(v) => Number(v),
				(v) => v > 0,
			);

			const callback = jest.fn();
			def.apply('-1', callback);

			expect(callback).not.toHaveBeenCalled();
		});

		it('should throw when default value fails validation', () => {
			type MyProp = SimpleProp<'myProp', number>;
			const def = createPropDefinition<MyProp>(
				'myProp',
				-1,
				(v) => Number(v),
				(v) => v > 0,
			);

			expect(() => def.apply(undefined, jest.fn())).toThrow();
		});

		it('should not call callback when normalize throws', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createPropDefinition<MyProp>('myProp', 'default', () => {
				throw new Error('normalize error');
			});

			const callback = jest.fn();
			def.apply('value', callback);

			expect(callback).not.toHaveBeenCalled();
		});
	});
});

describe('createDependentPropDefinition', () => {
	describe('getDefaultValue', () => {
		it('should return a fresh copy of a primitive default value', () => {
			// Primitives are immutable in JS, so this is a baseline sanity check
			// rather than a test for the defensive-copy mechanism.
			type MyProp = SimpleProp<'myProp', string>;
			const def = createDependentPropDefinition<MyProp>('myProp', 'original', (v) => v as string);

			expect(def.getDefaultValue()).toBe('original');
		});

		it('should not allow mutation of a default value via the returned reference', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createDependentPropDefinition<MyProp>('myProp', 'original', (v) => v as string);

			// String primitives cannot be mutated; verify the stored default remains unchanged
			void def.getDefaultValue();

			// The stored default must remain unaffected
			expect(def.getDefaultValue()).toBe('original');
		});

		it('should not allow mutation of an nested object default value via the returned reference', () => {
			type MyProp = SimpleProp<'myProp', { nested: string }>;
			const def = createDependentPropDefinition<MyProp>('myProp', { nested: 'original' }, (v) => v as { nested: string });

			// Mutate the returned default value
			def.getDefaultValue().nested = 'mutated';

			// The stored default must remain unaffected
			expect(def.getDefaultValue()).toEqual({ nested: 'original' });
		});
	});

	describe('apply', () => {
		it('should use the default value when value is undefined', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createDependentPropDefinition<MyProp, { dep: boolean }>('myProp', 'default', (v) => v as string);

			const callback = jest.fn();
			def.apply(undefined, callback, { dep: true });

			expect(callback).toHaveBeenCalledWith('default');
		});

		it('should use the default value when value is null', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createDependentPropDefinition<MyProp, { dep: boolean }>('myProp', 'default', (v) => v as string);

			const callback = jest.fn();
			def.apply(null, callback, { dep: true });

			expect(callback).toHaveBeenCalledWith('default');
		});

		it('should normalize and apply a provided value with deps', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createDependentPropDefinition<MyProp, { prefix: string }>('myProp', 'default', (v, deps) => `${deps.prefix}-${v as string}`);

			const callback = jest.fn();
			def.apply('value', callback, { prefix: 'pre' });

			expect(callback).toHaveBeenCalledWith('pre-value');
		});

		it('should not call callback when validation with deps fails', () => {
			type MyProp = SimpleProp<'myProp', number>;
			const def = createDependentPropDefinition<MyProp, { max: number }>(
				'myProp',
				0,
				(v) => Number(v),
				(v, deps) => v <= deps.max,
			);

			const callback = jest.fn();
			def.apply('10', callback, { max: 5 });

			expect(callback).not.toHaveBeenCalled();
		});

		it('should throw when default value fails validation with deps', () => {
			type MyProp = SimpleProp<'myProp', number>;
			const def = createDependentPropDefinition<MyProp, { max: number }>(
				'myProp',
				10,
				(v) => Number(v),
				(v, deps) => v <= deps.max,
			);

			expect(() => def.apply(undefined, jest.fn(), { max: 5 })).toThrow();
		});

		it('should not call callback when normalize throws', () => {
			type MyProp = SimpleProp<'myProp', string>;
			const def = createDependentPropDefinition<MyProp, unknown>('myProp', 'default', () => {
				throw new Error('normalize error');
			});

			const callback = jest.fn();
			def.apply('value', callback, {});

			expect(callback).not.toHaveBeenCalled();
		});
	});
});
