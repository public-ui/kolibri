import { KolToolbarTag } from '../../../core/component-names';
import type { ToolbarItemsPropType, ToolbarProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolToolbar } from '../shadow';

const ITEMS: ToolbarItemsPropType = [
	{
		type: 'button',
		_label: 'Button',
	},
	{
		type: 'link',
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
