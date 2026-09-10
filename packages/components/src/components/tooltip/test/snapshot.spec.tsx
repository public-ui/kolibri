import { KolTooltipWcTag } from '../../../core/component-names';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTooltipWc } from '../component';

executeSnapshotTests<Partial<Pick<KolTooltipWc, '_align' | '_id' | '_label'>>>(
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
