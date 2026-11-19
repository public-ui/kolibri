import { KolInputFileTag } from '../../../core/component-names';
import type { InputFileProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputFile } from '../component';

executeInputSnapshotTests<InputFileProps>(KolInputFileTag, [KolInputFile], undefined, { hasSmartButton: true });

executeSnapshotTests<InputFileProps>(
	KolInputFileTag,
	[KolInputFile],
	[
		{ _label: 'Label' },
		{ _accept: 'image/*,.pdf', _label: 'Label', _name: 'field' },
		{ _label: 'Label', _multiple: true, _name: 'field' },
		{ _label: 'Label', _name: 'field', _required: true },
		{
			_accept: '.txt',
			_icons: { left: { icon: 'codicon codicon-arrow-left' }, right: { icon: 'codicon codicon-arrow-right' } },
			_label: 'Label',
			_multiple: true,
			_name: 'field',
			_smartButton: { _hideLabel: true, _icons: 'codicon codicon-eye', _label: 'einblenden' },
		},
	],
);
