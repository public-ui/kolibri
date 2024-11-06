import { KolPopoverWcTag } from '@component-names';
import type { PopoverProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolPopover } from '../component';

executeSnapshotTests<PopoverProps>(KolPopoverWcTag, [KolPopover], [...['top', 'right', 'bottom', 'left'].map((_align) => ({ _align }) as PopoverProps)]);
