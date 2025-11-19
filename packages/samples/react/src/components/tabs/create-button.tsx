import { KolTabs } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleDescription } from '../SampleDescription';

export const CreateButton: FC = () => {
	const [tabs, setTabs] = useState([
		{
			_label: 'First tab',
		},
		{
			_label: 'Second Tab',
		},
	]);

	const addTab = () => {
		setTabs([
			...tabs,
			{
				_label: `Tab #${tabs.length + 1}`,
			},
		]);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTabs with a &quot;create tab&quot; button.</p>
			</SampleDescription>

			<KolTabs _tabs={tabs} className="mt-4" _label="Tabs with create button" _hasCreateButton _on={{ onCreate: addTab }}>
				{tabs.map((tab, index) => (
					<div key={`tab-${index}`} slot={`tab-${index}`}>
						Contents of {tab._label}
					</div>
				))}

				<div slot="tab-1">Contents of Tab 2</div>
			</KolTabs>
		</>
	);
};
