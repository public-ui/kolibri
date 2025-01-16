import { KolDrawerTag } from '../../../core/component-names';
import type { DrawerProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolDrawer } from '../shadow';

const variants = ['top', 'right', 'bottom', 'left'];

const testCases: DrawerProps[] = [
	...variants.map((variant) => ({
		_label: 'Label',
		_open: true,
		_variant: variant,
	})),
	{ _label: 'Label' },
	{ _label: 'Label', _open: false },
];

executeSnapshotTests<DrawerProps>(KolDrawerTag, [KolDrawer], testCases);
