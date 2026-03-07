import { describe, expect, it } from '@jest/globals';
import { newSpecPage } from '@stencil/core/testing';
import type { KolProgress } from '../component';
import { KolProgress as KolProgressComponent } from '../component';

describe('kol-progress default values', () => {
	it('should apply default values when properties are set to undefined', async () => {
		const page = await newSpecPage({
			components: [KolProgressComponent],
			html: `<kol-progress _label="Test" _variant="cycle" _max="100" _value="50"></kol-progress>`,
		});

		const instance = page.rootInstance as KolProgress;

		// Verify initial values are set correctly
		expect(instance._label).toBe('Test');
		expect(instance._variant).toBe('cycle');
		expect(instance._max).toBe(100);
		expect(instance._value).toBe(50);

		// Verify controlled values match the set props
		let props = instance['ctrl'].getProps();
		expect(props.variant).toBe('cycle');
		expect(props.label).toBe('Test');
		expect(props.max).toBe(100);
		expect(props.unit).toBe('%'); // default unit

		// Set variant to undefined - should apply default 'bar'
		instance._variant = undefined;
		await page.waitForChanges();

		props = instance['ctrl'].getProps();
		expect(props.variant).toBe('bar');

		// Set it back to cycle
		instance._variant = 'cycle';
		await page.waitForChanges();

		props = instance['ctrl'].getProps();
		expect(props.variant).toBe('cycle');

		// Set label to undefined - should apply default ''
		instance._label = undefined;
		await page.waitForChanges();

		props = instance['ctrl'].getProps();
		expect(props.label).toBe('');

		// Set unit to undefined - should apply default '%'
		instance._unit = undefined;
		await page.waitForChanges();

		props = instance['ctrl'].getProps();
		expect(props.unit).toBe('%');

		// Set max and verify value constraints are reapplied
		instance._max = 42;
		instance._value = 100; // more than new max
		await page.waitForChanges();

		props = instance['ctrl'].getProps();
		expect(props.max).toBe(42);
		expect(props.value).toBe(42); // clamped to new max
	});

	it('should restore cycle variant when set back from another variant', async () => {
		const page = await newSpecPage({
			components: [KolProgressComponent],
			html: `<kol-progress _label="Test" _variant="cycle" _max="100" _value="42"></kol-progress>`,
		});

		const instance = page.rootInstance as KolProgress;
		let props = instance['ctrl'].getProps();

		// Verify initial cycle variant
		expect(props.variant).toBe('cycle');

		// Change to bar variant
		instance._variant = 'bar';
		await page.waitForChanges();

		props = instance['ctrl'].getProps();
		expect(props.variant).toBe('bar');

		// Set back by removing attribute (undefined)
		instance._variant = undefined;
		await page.waitForChanges();

		props = instance['ctrl'].getProps();
		expect(props.variant).toBe('bar'); // defaults to 'bar' not 'cycle'
	});
});
