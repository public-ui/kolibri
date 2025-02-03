import { KolFormTag } from '../../../core/component-names';
import type { FormProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolForm } from '../shadow';

executeSnapshotTests<FormProps>(KolFormTag, [KolForm], [{ _requiredText: 'Pflichtfeld' }]);
