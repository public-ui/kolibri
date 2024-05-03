import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getTabsHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { TabsProps } from '../../../schema';
import { KolTabs } from '../component';

executeTests<TabsProps>(
	'Tabs',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolTabs],
			template: () => <kol-tabs {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_selected: [1, 0],
		_tabs: [
			[
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
			],
		],
	},
	getTabsHtml,
);
