import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolTabs } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import type { AlignPropType } from '@public-ui/components';

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

export const TabsAlign: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolTabs with the property <code>_align</code> set to <code>left</code>, <code>right</code>, <code>top</code> and <code>bottom</code>.
			</p>
		</SampleDescription>
		<div className="grid gap-8">
			{(['left', 'right', 'top', 'bottom'] as AlignPropType[]).map((align) => {
				const text = `Tabs with ${align} align`;
				return (
					<div key={align} className="grid gap-4">
						<KolHeading _level={2} _label={text} />
						<KolTabs _tabs={tabs} _align={align} _label={text}>
							<div slot="tab-0">Contents of Tab 1</div>
							<div slot="tab-1">Contents of Tab 2</div>
							<div slot="tab-2">Contents of Tab 3</div>
							<div slot="tab-3">Contents of Tab 4</div>
						</KolTabs>
					</div>
				);
			})}
		</div>
	</>
);
