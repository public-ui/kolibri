import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolLinkTag } from '../../../core/component-names';
import type { LinkProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolLink } from '../component';

const baseObj = { _href: 'https://example.com', _icons: 'codicon codicon-home', _label: 'Label', _target: 'self' };

executeSnapshotTests<LinkProps>(
	KolLinkTag,
	[KolLink],
	[
		{ ...baseObj },
		{ ...baseObj, _tooltipAlign: 'top' },
		{ ...baseObj, _tooltipAlign: 'left' },
		{ ...baseObj, _tooltipAlign: 'right' },
		{ ...baseObj, _tooltipAlign: 'bottom' },

		{ ...baseObj, _tooltipAlign: 'top', _hideLabel: true },

		{ _label: 'Label', _href: '', _download: 'download-file.zip', _target: 'blank' },
		// `download` is a presence attribute: an empty string must render as `download=""`.
		{ ...baseObj, _download: '' },

		{ _href: '#', _hideLabel: true },
		{ _href: '#', _hideLabel: true, _label: '   ' },
		{ _href: '#', _label: [{ text: 'partly english', lang: 'en' }, { text: 'Label' }] },
	],
);

describe('kol-link _hideLabel without label', () => {
	it('omits aria-label when _label is omitted', async () => {
		const page = await newSpecPage({
			components: [KolLink],
			template: () => <kol-link _href="#" _hideLabel={true} />,
		});
		await page.waitForChanges();

		const anchor = page.root?.shadowRoot?.querySelector('a');
		expect(anchor?.hasAttribute('aria-label')).toBe(false);
	});

	it('omits aria-label when _label is whitespace only', async () => {
		const page = await newSpecPage({
			components: [KolLink],
			template: () => <kol-link _href="#" _hideLabel={true} _label="   " />,
		});
		await page.waitForChanges();

		const anchor = page.root?.shadowRoot?.querySelector('a');
		expect(anchor?.hasAttribute('aria-label')).toBe(false);
	});
});
