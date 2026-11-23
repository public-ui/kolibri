import { KolAbbrTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';

import { KolAbbr } from './component';

executeSnapshotTests(KolAbbrTag, [KolAbbr], [{ _label: 'Text' }]);
