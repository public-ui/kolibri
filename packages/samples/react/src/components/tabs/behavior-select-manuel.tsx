import type { FC } from 'react';
import React from 'react';

import { KolTabs } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const tabs = [
	{
		_icons: 'codicon codicon-pie-chart',
		_label: 'First tab',
		_on: {
			onSelect: (event: Event) => {
				console.log('First tab selected', event);
			},
		},
	},
	{
		_icons: 'codicon codicon-calendar',
		_label: 'Second Tab',
	},
	{
		_disabled: true,
		_icons: 'codicon codicon-briefcase',
		_label: 'Disabled Tab',
	},
	{
		_icons: 'codicon codicon-telescope',
		_label: 'Last tab',
	},
];

const tabsWithoutIcons = tabs.map((tab) => ({
	...tab,
	_icons: undefined,
}));

export const TabsBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolTabs renders tab captions and their associated content. This example shows how to change the tab using the keyboard. The tab change only takes place
				with the enter or space key
			</p>
		</SampleDescription>

		<KolTabs _tabs={tabsWithoutIcons} _behavior="select-manual" _label="Regular tabs">
			<div slot="tab-0">Contents of Tab 1</div>
			<div slot="tab-1">Contents of Tab 2</div>
			<div slot="tab-2">Contents of Tab 3</div>
			<div slot="tab-3">Contents of Tab 4</div>
		</KolTabs>

		<KolTabs _tabs={tabs} className="mt-4" _behavior="select-manual" _label="Tabs with icons">
			<div slot="tab-0">Contents of Tab 1</div>
			<div slot="tab-1">Contents of Tab 2</div>
			<div slot="tab-2">Contents of Tab 3</div>
			<div slot="tab-3">Contents of Tab 4</div>
		</KolTabs>
	</>
);
