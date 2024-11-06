import { KolFormTag } from '@component-names';
import type { FormProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolForm } from '../shadow';

executeSnapshotTests<FormProps>(KolFormTag, [KolForm], [{ _requiredText: 'Pflichtfeld' }]);
