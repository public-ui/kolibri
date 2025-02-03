import { KolSpinTag } from '../../../core/component-names';
import type { SpinProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolSpin } from '../shadow';

executeSnapshotTests<SpinProps>(KolSpinTag, [KolSpin], [{ _show: false }, { _show: true }]);
