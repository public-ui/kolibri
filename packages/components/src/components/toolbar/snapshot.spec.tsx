import { KolToolbarTag } from '../../core/component-names';
import type { ToolbarItemsPropType, ToolbarProps } from '../../schema';
import { executeSnapshotTests } from '../../utils/testing';

import { KolToolbar } from './component';

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
		{
			_label: 'Label first item disabled',
			_items: [{ type: 'button', _label: 'Disabled', _disabled: true }, ...ITEMS],
		},
	],
);
