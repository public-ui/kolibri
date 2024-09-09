import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolTabs } from '@public-ui/react';
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

export const TabsBehavior: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolTabs with the property _behavior set to &quot;select-manual&quot; and &quot;select-automatic&quot;. With this property set, the tab
				change only takes place when the enter or space key is pressed.
			</p>
		</SampleDescription>
		<div className="grid gap-8">
			<div className="grid gap-4">
				<KolHeading _level={2} _label='Tabs with "select manual" behavior' />
				<KolTabs _tabs={tabs} _behavior="select-manual" _label="Tabs with select manual behavior">
					<div slot="tab-0">Contents of Tab 1</div>
					<div slot="tab-1">Contents of Tab 2</div>
					<div slot="tab-2">Contents of Tab 3</div>
					<div slot="tab-3">Contents of Tab 4</div>
				</KolTabs>
			</div>
			<div className="grid gap-4">
				<KolHeading _level={2} _label='Tabs with "select automatic" behavior' />
				<KolTabs _tabs={tabs} className="mt-4" _behavior="select-automatic" _label="Tabs with select automatic behavior">
					<div slot="tab-0">Contents of Tab 1</div>
					<div slot="tab-1">Contents of Tab 2</div>
					<div slot="tab-2">Contents of Tab 3</div>
					<div slot="tab-3">Contents of Tab 4</div>
				</KolTabs>
			</div>
		</div>
	</>
);
