import { KolAbbrTag } from '../../core/component-names';
import type { AbbrProps } from '../../schema';
import { executeSnapshotTests } from '../../utils/testing';

import { KolAbbr } from './component';

executeSnapshotTests<AbbrProps>(KolAbbrTag, [KolAbbr], [{ _label: 'Text' }]);
