import { KolInputTag } from '../../../core/component-names';
import type { InputProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputWc } from '../component';

executeInputSnapshotTests<InputProps>(KolInputTag, [KolInputWc], {}, { hasSmartButton: true });
