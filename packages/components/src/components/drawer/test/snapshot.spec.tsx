import { KolDrawerTag } from '@component-names';
import type { DrawerProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolDrawer } from '../shadow';

function getVariantsByModalMode(modal: boolean) {
	return ['top', 'right', 'bottom', 'left'].map((variant) => ({
		_label: 'Label',
		_modal: modal,
		_open: true,
		_variant: variant,
	}));
}

executeSnapshotTests<DrawerProps>(
	KolDrawerTag,
	[KolDrawer],
	[
		{ _label: 'Label' },
		{ _label: 'Label', _open: false },
		{ _label: 'Label', _modal: false, _open: false },
		{ _label: 'Label', _modal: true, _open: false },

		...getVariantsByModalMode(false),
		...getVariantsByModalMode(true),
	],
);
