import { describe, expect, it } from '@jest/globals';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputColor } from '../component';

describe('kol-input-color initial value', () => {
	it('routes a preset value through the value watcher into the render prop and the form association', async () => {
		const page = await newSpecPage({
			components: [KolInputColor],
			html: `<kol-input-color _label="Farbe" _name="farbe" _value="#ff0000"></kol-input-color>`,
		});

		const instance = page.rootInstance as KolInputColor;
		expect(instance.getRenderProp('value')).toBe('#ff0000');
		expect(await instance.getValue()).toBe('#ff0000');
	});

	it('never writes the non-mutable `_value` prop; without a preset value the native control keeps its initial value', async () => {
		const page = await newSpecPage({
			components: [KolInputColor],
			html: `<kol-input-color _label="Farbe" _name="farbe"></kol-input-color>`,
		});

		const instance = page.rootInstance as KolInputColor;
		// The prop stays untouched (it is not mutable) and the render value stays "not set" on
		// purpose — `getValue()` reads the initial value of the native control instead.
		expect(instance._value).toBeUndefined();
		expect(instance.getRenderProp('value')).toBeUndefined();
		expect(await instance.getValue()).toBe('');
	});
});
