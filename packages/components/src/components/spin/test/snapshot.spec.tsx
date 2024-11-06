import { KolSpinTag } from '@component-names';
import type { SpinProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolSpin } from '../shadow';

executeSnapshotTests<SpinProps>(KolSpinTag, [KolSpin], [{ _show: false }, { _show: true }]);
