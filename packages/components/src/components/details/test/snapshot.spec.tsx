import { KolDetailsTag } from '../../../../internals/src/core/component-names';
import type { DetailsProps } from '../../../../internals/src/schema/index';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolDetails } from '../component';

executeSnapshotTests<DetailsProps>(
	KolDetailsTag,
	[KolDetails],
	[
		{ _label: 'Zusammenfassung' },
		{ _label: 'Zusammenfassung', _level: 3 },
		{ _label: 'Zusammenfassung', _disabled: true, _open: false },
		{ _label: 'Zusammenfassung', _disabled: true, _open: true },
		{ _label: 'Zusammenfassung', _disabled: false, _open: false },
		{ _label: 'Zusammenfassung', _disabled: false, _open: true },
		{ _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
	],
);
