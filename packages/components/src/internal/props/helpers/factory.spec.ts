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

		it('should not allow mutation of an object default value via the returned reference', () => {
			type MyProp = SimpleProp<'myProp', { value: string }>;
			const def = createPropDefinition<MyProp>('myProp', { value: 'original' }, (v) => v as { value: string });

			// Mutate the returned default value
			const defaultVal = def.getDefaultValue();
			defaultVal.value = 'mutated';

			// The stored default must remain unaffected
			expect(def.getDefaultValue().value).toBe('original');
		});

		it('should not allow mutation of a nested object default value', () => {
			type MyProp = SimpleProp<'myProp', { nested: { value: string } }>;
			const def = createPropDefinition<MyProp>('myProp', { nested: { value: 'original' } }, (v) => v as { nested: { value: string } });

			// Mutate the nested returned default value
			const defaultVal = def.getDefaultValue();
			defaultVal.nested.value = 'mutated';

			// The stored default must remain unaffected
			expect(def.getDefaultValue().nested.value).toBe('original');
		});
	});
});

describe('createDependentPropDefinition', () => {
	describe('getDefaultValue', () => {
		it('should not allow mutation of an object default value via the returned reference', () => {
			type MyProp = SimpleProp<'myProp', { value: string }>;
			const def = createDependentPropDefinition<MyProp>('myProp', { value: 'original' }, (v) => v as { value: string });

			// Mutate the returned default value
			const defaultVal = def.getDefaultValue();
			defaultVal.value = 'mutated';

			// The stored default must remain unaffected
			expect(def.getDefaultValue().value).toBe('original');
		});

		it('should not allow mutation of a nested object default value', () => {
			type MyProp = SimpleProp<'myProp', { nested: { value: string } }>;
			const def = createDependentPropDefinition<MyProp>('myProp', { nested: { value: 'original' } }, (v) => v as { nested: { value: string } });

			// Mutate the nested returned default value
			const defaultVal = def.getDefaultValue();
			defaultVal.nested.value = 'mutated';

			// The stored default must remain unaffected
			expect(def.getDefaultValue().nested.value).toBe('original');
		});
	});
});
