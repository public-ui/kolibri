import type { FC } from 'react';
import React from 'react';

import { KolTabs } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const tabs = [
	{
		_icons: 'codicon codicon-pie-chart',
		_label: 'Erster Tab',
	},
	{
		_icons: 'codicon codicon-calendar',
		_label: 'Zweiter Tab',
	},
	{
		_disabled: true,
		_icons: 'codicon codicon-briefcase',
		_label: 'Deaktivierter Tab',
	},
	{
		_icons: 'codicon codicon-telescope',
		_label: 'Letzter Tab',
	},
];

const tabsWithoutIcons = tabs.map((tab) => ({
	...tab,
	_icons: undefined,
}));

export const TabsBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind verschiedene Varianten von Tabs. Nur der Inhalt eines Tabs wird in jeder Zeile angezeigt.</p>
		</SampleDescription>
		<>
			<KolTabs _tabs={tabsWithoutIcons} _label="Regular tabs">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
				<div slot="tab-3">Inhalte von Tab 4</div>
			</KolTabs>

			<KolTabs _tabs={tabs} className="mt-4" _label="Tabs with icons">
				<div slot="tab-0">Inhalte von Tab 1</div>
				<div slot="tab-1">Inhalte von Tab 2</div>
				<div slot="tab-2">Inhalte von Tab 3</div>
				<div slot="tab-3">Inhalte von Tab 4</div>
			</KolTabs>
		</>
	</>
);
