import type { FC } from 'react';
import React from 'react';

import { KolTabs } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const tabs = Array.from({ length: 12 }, (_, index) => ({
	_label: `Tab ${index + 1}`,
}));

export const TabsOverflow: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolTabs with more tab captions than fit into the available width. Instead of wrapping the captions onto multiple rows, the
				tab bar stays on a single line and becomes horizontally scrollable.
			</p>
		</SampleDescription>

		<div style={{ maxWidth: '24rem' }}>
			<KolTabs _tabs={tabs} _label="Tabs with horizontal overflow">
				{tabs.map((_, index) => (
					<div key={index} slot={`tab-${index}`}>
						Contents of Tab {index + 1}
					</div>
				))}
			</KolTabs>
		</div>
	</>
);
