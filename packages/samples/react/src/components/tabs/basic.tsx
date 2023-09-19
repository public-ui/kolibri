import React, { FC } from 'react';
import { KolTabs } from '@public-ui/react';

const tabs = [
	{
		_icon: 'codicon codicon-pie-chart',
		_label: 'Erster Tab',
	},
	{
		_icon: 'codicon codicon-calendar',
		_label: 'Zweites Tab',
	},
	{
		_disabled: true,
		_icon: 'codicon codicon-briefcase',
		_label: 'Deaktiviertes Tab',
	},
	{
		_icon: 'codicon codicon-telescope',
		_label: 'Letzter Tab',
	},
];
export const TabsBasic: FC = () => (
	<KolTabs _tabs={tabs}>
		<div slot="tab-0">Inhalte von Tab 1</div>
		<div slot="tab-1">Inhalte von Tab 2</div>
		<div slot="tab-2">Inhalte von Tab 3</div>
		<div slot="tab-3">Inhalte von Tab 4</div>
	</KolTabs>
);
