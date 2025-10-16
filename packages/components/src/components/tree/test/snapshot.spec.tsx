import { KolTreeTag } from '../../../core/component-names';
import type { TreeProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTreeWc } from '../component';
import { KolTree } from '../shadow';

executeSnapshotTests<TreeProps>(KolTreeTag, [KolTree, KolTreeWc], [{ _label: 'Label' }]);
