import type { FC } from 'react';
import React from 'react';

import { KolTabs } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const tabs = [
	{
		_hideLabel: true,
		_icons: 'kolicon-check',
		_label: 'First tab',
		_on: {
			onSelect: (event: Event) => {
				console.log('First tab selected', event);
			},
		},
	},
	{
		_hideLabel: true,
		_icons: 'kolicon-link-external',
		_label: 'Second Tab',
	},
	{
		_disabled: true,
		_hideLabel: true,
		_icons: 'kolicon-house',
		_label: 'Disabled Tab',
	},
	{
		_hideLabel: true,
		_icons: 'kolicon-eye',
		_label: 'Last tab',
	},
];
export const TabsIconsOnly: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTabs with hidden labels.</p>
		</SampleDescription>

		<SampleBlock id="icons-only">
			<KolTabs _label="Tabs with icons" _tabs={tabs}>
				<p slot="tab-0">Contents of Tab 1</p>
				<p slot="tab-1">Contents of Tab 2</p>
				<p slot="tab-2">Contents of Tab 3</p>
				<p slot="tab-3">Contents of Tab 4</p>
			</KolTabs>
		</SampleBlock>
	</>
);
