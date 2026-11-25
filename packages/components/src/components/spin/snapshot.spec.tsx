import { executeSnapshotTests } from '../../utils/testing';
import { KolSpin } from './component';

const KOL_SPIN_TAG = 'kol-spin';

executeSnapshotTests(KOL_SPIN_TAG, [KolSpin], [{ _show: false }, { _show: true }, { _show: true, _label: 'Loading' }]);
