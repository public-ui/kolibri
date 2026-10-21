import { newSpecPage } from '@stencil/core/testing';

import { KolButtonLink } from '../../button-link/component';
import { KolPopoverButton } from '../../popover-button/component';
import { KolSplitButton } from '../../split-button/component';
import { KolButton } from '../component';

describe('button elements _tooltipAlign fallback (#11217)', () => {
	it('restores tooltipAlign to "top" on kol-button when _tooltipAlign is reset to undefined', async () => {
		const page = await newSpecPage({
			components: [KolButton],
			html: '<kol-button _label="Speichern"></kol-button>',
		});

		const button = page.root as (HTMLElement & KolButton) | null;
		const instance = page.rootInstance as KolButton;

		expect(instance.getRenderProp('tooltipAlign')).toBe('top');

		button!._tooltipAlign = 'bottom';
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('bottom');

		button!._tooltipAlign = undefined;
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('top');
	});

	it('restores tooltipAlign to "top" on kol-button-link when _tooltipAlign is reset to undefined', async () => {
		const page = await newSpecPage({
			components: [KolButtonLink],
			html: '<kol-button-link _label="Link" _href="#"></kol-button-link>',
		});

		const button = page.root as (HTMLElement & KolButtonLink) | null;
		const instance = page.rootInstance as KolButtonLink;

		expect(instance.getRenderProp('tooltipAlign')).toBe('top');

		button!._tooltipAlign = 'left';
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('left');

		button!._tooltipAlign = undefined;
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('top');
	});

	it('restores tooltipAlign to "top" on kol-popover-button when _tooltipAlign is reset to undefined', async () => {
		const page = await newSpecPage({
			components: [KolPopoverButton],
			html: '<kol-popover-button _label="Popover"></kol-popover-button>',
		});

		const button = page.root as (HTMLElement & KolPopoverButton) | null;
		const instance = page.rootInstance as KolPopoverButton;

		expect(instance.getRenderProp('tooltipAlign')).toBe('top');

		button!._tooltipAlign = 'right';
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('right');

		button!._tooltipAlign = undefined;
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('top');
	});

	it('restores tooltipAlign to "top" on kol-split-button when _tooltipAlign is reset to undefined', async () => {
		const page = await newSpecPage({
			components: [KolSplitButton],
			html: '<kol-split-button _label="Split"></kol-split-button>',
		});

		const button = page.root as (HTMLElement & KolSplitButton) | null;
		const instance = page.rootInstance as KolSplitButton;

		expect(instance.getRenderProp('tooltipAlign')).toBe('top');

		button!._tooltipAlign = 'bottom';
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('bottom');

		button!._tooltipAlign = undefined;
		await page.waitForChanges();
		expect(instance.getRenderProp('tooltipAlign')).toBe('top');
	});
});
