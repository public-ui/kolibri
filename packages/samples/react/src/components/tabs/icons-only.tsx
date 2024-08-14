import type { FC } from 'react';
import React from 'react';

import { KolTabs } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const tabs = [
	{
		_icons: 'codicon codicon-pie-chart',
		_label: 'First Tab',
		_hideLabel: true,
	},
	{
		_icons: 'codicon codicon-calendar',
		_label: 'Second Tab',
		_hideLabel: true,
	},
	{
		_disabled: true,
		_icons: 'codicon codicon-briefcase',
		_label: 'Disabled Tab',
		_hideLabel: true,
	},
	{
		_icons: 'codicon codicon-telescope',
		_label: 'Last Tab',
		_hideLabel: true,
	},
];
export const TabsIconsOnly: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTabs with hidden labels.</p>
		</SampleDescription>

		<KolTabs _label="Tabs with icons" _tabs={tabs}>
			<div slot="tab-0">Contents of Tab 1</div>
			<div slot="tab-1">Contents of Tab 2</div>
			<div slot="tab-2">Contents of Tab 3</div>
			<div slot="tab-3">Contents of Tab 4</div>
		</KolTabs>
	</>
);
