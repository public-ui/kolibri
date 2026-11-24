import { KolIconTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';
import { KolIcon } from './component';

executeSnapshotTests(
	KolIconTag,
	[KolIcon],
	[
		{ _icons: 'kolicon-houses', _label: 'Home icon' },
		{ _icons: 'fa-solid fa-user', _label: '' },
	],
);
