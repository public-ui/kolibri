import { KolDrawerTag } from '../../core/component-names';
import type { AlignPropType } from '../../schema';
import { type ElementProps, executeSnapshotTests } from '../../utils/testing';
import { KolDrawer } from './component';

const aligns: AlignPropType[] = ['top', 'right', 'bottom', 'left'];

const testCases: ElementProps<typeof KolDrawerTag>[] = [
	...aligns.map((align) => ({
		_label: 'Label',
		_open: true,
		_align: align,
	})),
	{ _label: 'Label' },
	{ _label: 'Label', _open: false },
	{ _label: 'Label', _open: true, _hasCloser: true },
	{ _label: 'Label', _open: true, _level: 2 },
	{ _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
];

executeSnapshotTests(KolDrawerTag, [KolDrawer], testCases);
