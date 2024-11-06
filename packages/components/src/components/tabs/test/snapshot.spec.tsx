import { KolTabsTag } from '@component-names';
import type { TabsProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolTabs } from '../shadow';

executeSnapshotTests<TabsProps>(
	KolTabsTag,
	[KolTabs],
	[
		{
			_label: 'Text',
			_selected: 1,
			_tabs: [
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
		},
	],
);
