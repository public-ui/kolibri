import { KolPopoverWcTag } from '../../../core/component-names';
import type { PopoverProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolPopoverWc } from '../component';

executeSnapshotTests<PopoverProps>(KolPopoverWcTag, [KolPopoverWc], [...['top', 'right', 'bottom', 'left'].map((_align) => ({ _align }) as PopoverProps)]);
