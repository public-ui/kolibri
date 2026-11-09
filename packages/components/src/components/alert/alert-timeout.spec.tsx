import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolAlert } from './component';

const ALERT_TIMEOUT = 10000;

describe('kol-alert live region timeout', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('removes role="alert" after the timeout', async () => {
		const timeouts: Array<() => void> = [];
		const originalSetTimeout = globalThis.setTimeout;
		jest.spyOn(globalThis, 'setTimeout').mockImplementation(((callback: () => void, delay?: number) => {
			if (delay === ALERT_TIMEOUT) {
				timeouts.push(callback);
				return 0 as unknown as ReturnType<typeof setTimeout>;
			}
			return originalSetTimeout(callback, delay);
		}) as typeof setTimeout);

		const page = await newSpecPage({
			components: [KolAlert],
			template: () => <kol-alert _alert _label="Alert" />,
		});
		expect(page.root?.shadowRoot?.querySelector('[role="alert"]')).not.toBeNull();
		expect(timeouts).toHaveLength(1);

		timeouts[0]();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[role="alert"]')).toBeNull();
	});
});
