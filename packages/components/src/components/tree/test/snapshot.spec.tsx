import { KolTreeTag } from '../../../core/component-names';
import type { TreeProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTree } from '../shadow';
import { KolTreeWc } from '../component';

executeSnapshotTests<TreeProps>(KolTreeTag, [KolTree, KolTreeWc], [{ _label: 'Label' }]);
