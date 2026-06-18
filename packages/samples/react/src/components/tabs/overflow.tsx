import type { FC } from 'react';
import React from 'react';

import { KolTabs } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const tabs = Array.from({ length: 12 }, (_, index) => ({ _label: `Tab ${index + 1}` }));

export const TabsOverflow: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTabs with more tabs than fit the available width: the tab bar scrolls horizontally instead of wrapping onto multiple rows.</p>
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
