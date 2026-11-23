import { KolTreeTag } from '../../core/component-names';
import type { TreeProps } from '../../schema';
import { executeSnapshotTests } from '../../utils/testing';

import { KolTree } from './component';

executeSnapshotTests<TreeProps>(KolTreeTag, [KolTree], [{ _label: 'Label' }]);
