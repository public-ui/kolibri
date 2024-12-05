import type { MsgPropType } from '../schema';
import { transformObjectProperties } from './transformObjectProperties';

describe('transformObjectProperties', () => {
	it('should transform basic object with underscore keys', () => {
		const input = {
			_name: 'John',
			_age: 30,
		};

		const result = transformObjectProperties(input);

		expect(result).toEqual({
			name: 'John',
			age: 30,
		});
	});

	it('should handle mixed keys', () => {
		const input = {
			_name: 'John',
			regularKey: 'value',
		};

		const result = transformObjectProperties(input);

		expect(result).toEqual({
			name: 'John',
			regularKey: 'value',
		});
	});

	it('should preserve value types', () => {
		const callback = () => 'test';
		const input = {
			_name: 'John',
			_age: 30,
			_isActive: true,
			_callback: callback,
		};

		const result = transformObjectProperties(input);

		expect(result.name).toBe('John');
		expect(result.age).toBe(30);
		expect(result.isActive).toBe(true);
		expect(result.callback()).toBe('test');
	});

	it('should handle complex object with underscore keys', () => {
		const input: MsgPropType = {
			_level: 2,
			_on: undefined,
			_type: 'error',
			_variant: 'card',
			_label: 'Test Label',
			_alert: true,
			_hasCloser: true,
			_description: 'Test Description',
		};

		const result = transformObjectProperties(input);

		expect(result).toEqual({
			level: 2,
			on: undefined,
			type: 'error',
			variant: 'card',
			label: 'Test Label',
			alert: true,
			hasCloser: true,
			description: 'Test Description',
		});
	});
});
