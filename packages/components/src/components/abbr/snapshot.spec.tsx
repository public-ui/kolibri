import { h } from '@stencil/core';
import type { SpecPage } from '@stencil/core/testing';
import { newSpecPage } from '@stencil/core/testing';

import { KolAbbrTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';

import { KolAbbr } from './component';

executeSnapshotTests<Pick<KolAbbr, '_abbr' | '_label'>>(
	KolAbbrTag,
	[KolAbbr],
	[{ _abbr: 'z. B.' }, { _abbr: 'z. B.', _label: 'zum Beispiel' }, { _label: 'zum Beispiel' }, { _abbr: 'm' }],
);

describe('kol-abbr default slot', () => {
	const getSlot = (page: SpecPage) => page.root?.shadowRoot?.querySelector('slot');

	it('renders plain text in the slot', async () => {
		const page = await newSpecPage({ components: [KolAbbr], html: '<kol-abbr>z. B.</kol-abbr>' });
		expect(getSlot(page)?.closest('[hidden]')).toBeNull();
	});

	it('does not render markup in the slot', async () => {
		const page = await newSpecPage({ components: [KolAbbr], html: '<kol-abbr><strong>z. B.</strong></kol-abbr>' });
		expect(getSlot(page)?.closest('[hidden]')).not.toBeNull();
	});

	it('ignores the slot with _abbr', async () => {
		const page = await newSpecPage({
			components: [KolAbbr],
			template: () => <kol-abbr _abbr="z. B.">ignored</kol-abbr>,
		});
		expect(page.root?.shadowRoot?.querySelector('slot')).toBeNull();
		expect(page.root?.shadowRoot?.querySelector('abbr')?.textContent).toBe('z. B.');
	});
});
