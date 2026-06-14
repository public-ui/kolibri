import { newSpecPage } from '@stencil/core/testing';

import { setCurrentLocation } from './ariaCurrentService';
import { KolLink } from './component';

describe('kol-link aria-current', () => {
	const getAnchor = (root?: HTMLElement): HTMLAnchorElement | null => root?.shadowRoot?.querySelector('a') ?? null;

	afterEach(() => {
		setCurrentLocation('/kolibri-test-reset');
	});

	it('updates the rendered aria-current when _ariaCurrentValue changes after initialization', async () => {
		setCurrentLocation('/current');

		const page = await newSpecPage({
			components: [KolLink],
			html: `<kol-link _href="/current" _label="Current"></kol-link>`,
		});

		expect(getAnchor(page.root)?.getAttribute('aria-current')).toBe('page');

		(page.root as HTMLKolLinkElement)._ariaCurrentValue = 'step';
		await page.waitForChanges();

		expect(getAnchor(page.root)?.getAttribute('aria-current')).toBe('step');
	});

	it('updates and removes the rendered aria-current when _href changes after initialization', async () => {
		setCurrentLocation('/current');

		const page = await newSpecPage({
			components: [KolLink],
			html: `<kol-link _href="/other" _aria-current-value="location" _label="Current"></kol-link>`,
		});

		expect(getAnchor(page.root)?.hasAttribute('aria-current')).toBe(false);

		(page.root as HTMLKolLinkElement)._href = '/current';
		await page.waitForChanges();

		expect(getAnchor(page.root)?.getAttribute('aria-current')).toBe('location');

		(page.root as HTMLKolLinkElement)._href = '/other';
		await page.waitForChanges();

		expect(getAnchor(page.root)?.hasAttribute('aria-current')).toBe(false);
	});
});
