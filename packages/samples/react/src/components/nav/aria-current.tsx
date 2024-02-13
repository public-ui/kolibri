import React from 'react';

import { KolNav } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const NavAriaCurrent: FC = () => (
	<>
		<SampleDescription>
			<p>
				Dieses Beispiel zeigt eine Navigation, bei welcher der zweite Link auf die aktuelle Seite verweist. Dadurch wird ihm automatisch das Attribut{' '}
				<code>aria-current=&quot;page&quot;</code> zugewiesen.
			</p>
		</SampleDescription>

		<KolNav
			class="block w-sm"
			_label="Main navigation"
			_links={[
				{
					_label: 'Homepage',
					_href: '#/back-page',
				},
				{
					_label: 'Nav - aria-current (Aktuelle Seite)',
					_href: '#/back-page',
					_active: true,
				},
			]}
		/>
	</>
);
