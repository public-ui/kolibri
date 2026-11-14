import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KolButton } from '../components/button/component';
import { bootstrap } from './bootstrap';
import { KolButtonTag } from './component-names';

describe('bootstrap tag name transformation', () => {
	it('registers the transformer with the stencil runtime, so internal compositions render under the transformed tag', async () => {
		await bootstrap([], [], { transformTagName: (tagName) => `app-${tagName}` });

		const page = await newSpecPage({ components: [KolButton], template: () => <KolButtonTag _label="Label"></KolButtonTag> });
		expect(page.root?.tagName).toBe('APP-KOL-BUTTON');
	});

	it('transforms component tags only, because the stencil runtime would otherwise rename native HTML tags as well', async () => {
		await bootstrap([], [], { transformTagName: (tagName) => `app-${tagName}` });

		const page = await newSpecPage({ components: [KolButton], template: () => <KolButtonTag _label="Label"></KolButtonTag> });
		const html = page.root!.shadowRoot!.innerHTML;
		expect(html).not.toContain('<app-');
		expect(page.root?.tagName).toBe('APP-KOL-BUTTON');
	});

	it('warns when a transformer is registered twice', async () => {
		const warn = jest.spyOn(console, 'warn').mockImplementation(() => ({}));

		await bootstrap([], [], { transformTagName: (tagName) => `app-${tagName}` });
		warn.mockClear();
		await bootstrap([], [], { transformTagName: (tagName) => `v2-${tagName}` });

		expect(warn).toHaveBeenCalledTimes(2);
		warn.mockRestore();
	});
});
