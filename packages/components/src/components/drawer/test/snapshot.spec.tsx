import { KolDrawerTag } from '../../../core/component-names';
import type { DrawerProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolDrawer } from '../shadow';

executeSnapshotTests<DrawerProps>(KolDrawerTag, [KolDrawer], [{ _label: 'Label' }, { _label: 'Label', _open: false }, { _label: 'Label', _open: true }]);
