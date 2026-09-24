import { KolDrawerTag } from '../../../core/component-names';
import type { AlignPropType, DrawerProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolDrawer } from '../component';

const aligns: AlignPropType[] = ['top', 'right', 'bottom', 'left'];

const testCases: DrawerProps[] = [
	...aligns.map((align) => ({
		_label: 'Label',
		_open: true,
		_align: align,
	})),
	{ _label: 'Label' },
	{ _label: 'Label', _open: false },
	{ _label: 'Label', _open: true, _hasCloser: true },
	{ _label: 'Label', _open: true, _level: 2 },
];

executeSnapshotTests<DrawerProps>(KolDrawerTag, [KolDrawer], testCases);
