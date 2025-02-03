import { KolDetailsTag } from '../../../core/component-names';
import type { DetailsProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolDetails } from '../shadow';

executeSnapshotTests<DetailsProps>(
	KolDetailsTag,
	[KolDetails],
	[
		{ _label: 'Zusammenfassung' },

		{ _label: 'Zusammenfassung', _disabled: true, _open: false },
		{ _label: 'Zusammenfassung', _disabled: true, _open: true },
		{ _label: 'Zusammenfassung', _disabled: false, _open: false },
		{ _label: 'Zusammenfassung', _disabled: false, _open: true },

		...[0, 1, 2, 3, 4, 5, 6].map((_level) => ({ _label: 'Zusammenfassung', _level }) as DetailsProps),
	],
);
