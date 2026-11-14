import { KolDrawerTag } from '../../../../internals/src/core/component-names';
import type { AlignPropType, DrawerProps } from '../../../../internals/src/schema/index';
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
	{ _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
];

executeSnapshotTests<DrawerProps>(KolDrawerTag, [KolDrawer], testCases);
