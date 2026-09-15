import { KolAbbrTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';

import { KolAbbr } from './component';

executeSnapshotTests<Pick<KolAbbr, '_label'>>(KolAbbrTag, [KolAbbr], [{ _label: 'Text' }]);
