import { KolDrawerTag } from '../../../core/component-names';
import type { DrawerProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolDrawer } from '../shadow';

function getVariantsByModalMode() {
	return ['top', 'right', 'bottom', 'left'].map((variant) => ({
		_label: 'Label',
		_open: true,
		_variant: variant,
	}));
}

executeSnapshotTests<DrawerProps>(KolDrawerTag, [KolDrawer], [{ _label: 'Label' }, { _label: 'Label', _open: false }, ...getVariantsByModalMode()]);
