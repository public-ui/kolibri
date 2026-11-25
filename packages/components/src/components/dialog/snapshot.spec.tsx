import { KolDialogTag, KolModalTag } from '../../core/component-names';
import { type ElementProps, executeSnapshotTests } from '../../utils/testing';
import { KolModal } from '../modal/component';
import { KolDialog } from './component';

const cases: ElementProps<typeof KolDialogTag>[] = [
	{
		_label: 'Blank Dialog',
		_variant: 'blank',
		_width: '80%',
	},
	{
		_label: 'Dialog as Card',
		_variant: 'card',
		_width: '80%',
	},
	{ _label: [{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }], _variant: 'blank', _width: '80%' },
	{
		_label: [{ text: 'Acquirer', lang: 'en' }, { text: '-Gutschrift' }],
		_variant: 'card',
		_width: '80%',
	},
];

executeSnapshotTests(KolDialogTag, [KolDialog], cases);
executeSnapshotTests(KolModalTag, [KolModal], cases);
