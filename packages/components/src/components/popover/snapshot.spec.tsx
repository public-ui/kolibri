import { KolPopoverWcTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';

import { KolPopover } from './component';

type PopoverSnapshotProps = {
	_align?: string;
	_show?: boolean;
};

executeSnapshotTests<PopoverSnapshotProps>(
	KolPopoverWcTag,
	[KolPopover],
	[...(['top', 'right', 'bottom', 'left'] as const).map((_align) => ({ _align }) as PopoverSnapshotProps)],
);
