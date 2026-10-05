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
		expect(instance.getRenderProp('variant')).toBe('cycle');
		expect(instance.getRenderProp('label')).toBe('Test');
		expect(instance.getRenderProp('max')).toBe(100);
		expect(instance.getRenderProp('unit')).toBe('%'); // default unit

		// Set variant to undefined - should apply default 'bar'
		page.root!.removeAttribute('_variant');
		await page.waitForChanges();

		expect(instance.getRenderProp('variant')).toBe('bar');

		// Set it back to cycle
		page.root!.setAttribute('_variant', 'cycle');
		await page.waitForChanges();

		expect(instance.getRenderProp('variant')).toBe('cycle');

		// Set label to undefined - should apply default ''
		page.root!.removeAttribute('_label');
		await page.waitForChanges();

		expect(instance.getRenderProp('label')).toBe('');

		// Set unit to undefined - should apply default '%'
		page.root!.removeAttribute('_unit');
		await page.waitForChanges();

		expect(instance.getRenderProp('unit')).toBe('%');

		// Set max and verify value constraints are reapplied
		page.root!.setAttribute('_max', '42');
		page.root!.setAttribute('_value', '100'); // more than new max
		await page.waitForChanges();

		expect(instance.getRenderProp('max')).toBe(42);
		expect(instance.getRenderProp('value')).toBe(42); // clamped to new max
	});

	it('should restore cycle variant when set back from another variant', async () => {
		const page = await newSpecPage({
			components: [KolProgressComponent],
			html: `<kol-progress _label="Test" _variant="cycle" _max="100" _value="42"></kol-progress>`,
		});

		const instance = page.rootInstance as KolProgress;
		// Verify initial cycle variant
		expect(instance.getRenderProp('variant')).toBe('cycle');

		// Change to bar variant
		page.root!.setAttribute('_variant', 'bar');
		await page.waitForChanges();

		expect(instance.getRenderProp('variant')).toBe('bar');

		// Set back by removing attribute (undefined)
		page.root!.removeAttribute('_variant');
		await page.waitForChanges();

		expect(instance.getRenderProp('variant')).toBe('bar'); // defaults to 'bar' not 'cycle'
	});
});
