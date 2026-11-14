import { KolTreeTag } from '../../../internals/src/core/component-names';
import type { TreeProps } from '../../../internals/src/schema/index';
import { executeSnapshotTests } from '../../utils/testing';

import { KolTree } from './component';

executeSnapshotTests<TreeProps>(KolTreeTag, [KolTree], [{ _label: 'Label' }]);
