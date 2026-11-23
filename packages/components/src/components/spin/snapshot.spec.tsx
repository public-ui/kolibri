import { executeSnapshotTests } from '../../utils/testing';

import { KolSpin } from './component';

const KOL_SPIN_TAG = 'kol-spin';

type SpinSnapshotProps = {
	_show?: boolean;
	_label?: string;
	_variant?: string;
};

executeSnapshotTests<SpinSnapshotProps>(KOL_SPIN_TAG, [KolSpin], [{ _show: false }, { _show: true }, { _show: true, _label: 'Loading' }]);
