import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { BadgeProps } from '../../schema';
import { KolBadge } from './component';

// The block-level root and the trailing <br /> are load-bearing for NVDA read mode (see BadgeFC),
// but they are invisible and otherwise only covered by auto-generated snapshots, which a `-u` run
// would silently rewrite. These assertions fail loudly instead.

const renderBadge = async (props: BadgeProps) => {
	const page = await newSpecPage({ components: [KolBadge], template: () => <kol-badge {...props} /> });
	await page.waitForChanges();
	return page.root?.shadowRoot?.querySelector('.kol-badge');
};

describe('KolBadge – read-mode wrapping', () => {
	it('renders a block-level root element', async () => {
		const wrapper = await renderBadge({ _label: 'Text' });

		expect(wrapper?.tagName).toBe('DIV');
	});

	it('renders the wrapping line break as the last child', async () => {
		const wrapper = await renderBadge({ _label: 'Text' });

		expect(wrapper?.lastElementChild?.tagName).toBe('BR');
	});

	it('renders exactly one line break at wrapper level', async () => {
		const wrapper = await renderBadge({ _label: 'Text' });
		const lineBreaks = Array.from(wrapper?.children ?? []).filter((child) => child.tagName === 'BR');

		expect(lineBreaks).toHaveLength(1);
	});

	it('keeps the smart button before the line break, so tab order stays unchanged', async () => {
		const wrapper = await renderBadge({ _label: 'Badge fallback', _smartButton: { _ariaDescription: 'Badge label', _label: 'Remove' } });

		expect(wrapper?.lastElementChild?.tagName).toBe('BR');
		expect(wrapper?.querySelector('.kol-badge__smart-button')?.nextElementSibling?.tagName).toBe('BR');
	});
});
