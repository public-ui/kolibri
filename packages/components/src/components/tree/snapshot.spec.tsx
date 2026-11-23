import { KolTreeTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';

import { KolTree } from './component';

executeSnapshotTests(KolTreeTag, [KolTree], [{ _label: 'Label' }]);
