import { KolTreeTag } from '@component-names';
import type { TreeProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolTree } from '../shadow';
import { KolTreeWc } from '../component';

executeSnapshotTests<TreeProps>(KolTreeTag, [KolTree, KolTreeWc], [{ _label: 'Label' }]);
