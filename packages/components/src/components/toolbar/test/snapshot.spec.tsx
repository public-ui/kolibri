import { KolToolbarTag } from '@component-names';
import type { ToolbarProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolToolbar } from '../shadow';

executeSnapshotTests<ToolbarProps>(
	KolToolbarTag,
	[KolToolbar],
	[
		{
			_label: 'Text',
			_items: [
				{
					_label: 'Button',
				},
				{
					_href: '#',
					_label: 'Link',
				},
			],
		},
	],
);
