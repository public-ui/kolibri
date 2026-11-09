import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { newSpecPage } from '@stencil/core/testing';

import { KolProgress } from './component';

describe('kol-progress live value interval', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('restarts the interval when the element is inserted into the DOM again', async () => {
		const page = await newSpecPage({
			components: [KolProgress],
			html: `<div id="a"><kol-progress _label="Progress" _max="100" _value="50"></kol-progress></div><div id="b"></div>`,
		});
		const setIntervalSpy = jest.spyOn(globalThis, 'setInterval');
		const clearIntervalSpy = jest.spyOn(globalThis, 'clearInterval');
		const progress = page.body.querySelector('kol-progress')!;

		page.body.querySelector('#b')!.appendChild(progress);
		await page.waitForChanges();

		expect(clearIntervalSpy).toHaveBeenCalled();
		expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 5000);
	});
});
