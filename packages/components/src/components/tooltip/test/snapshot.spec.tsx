import { KolTooltipWcTag } from '../../../core/component-names';
import type { TooltipProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTooltipWc } from '../component';

executeSnapshotTests<TooltipProps>(
	KolTooltipWcTag,
	[KolTooltipWc],
	[
		{ _id: 'id', _label: 'Label' },
		{ _id: 'id', _label: 'Label', _align: 'top' },
		{ _id: 'id', _label: 'Label', _align: 'left' },
		{ _id: 'id', _label: 'Label', _align: 'right' },
		{ _id: 'id', _label: 'Label', _align: 'bottom' },
	],
);
