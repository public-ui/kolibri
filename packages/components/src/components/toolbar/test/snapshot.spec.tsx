import { KolToolbarTag } from '../../../core/component-names';
import type { ToolbarProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolToolbar } from '../shadow';

const ITEMS = [
	{
		_label: 'Button',
	},
	{
		_href: '#',
		_label: 'Link',
	},
];

executeSnapshotTests<ToolbarProps>(
	KolToolbarTag,
	[KolToolbar],
	[
		{
			_label: 'Label horizontal',
			_items: ITEMS,
		},
		{
			_label: 'Label vertical',
			_items: ITEMS,
			_orientation: 'vertical',
		},
	],
);
