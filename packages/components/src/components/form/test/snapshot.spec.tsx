import { KolFormTag } from '../../../core/component-names';
import type { FormProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolForm } from '../component';

executeSnapshotTests<FormProps>(
	KolFormTag,
	[KolForm],
	[
		{ _requiredText: 'Pflichtfeld' },
		{ _requiredText: true },
		{ _requiredText: false },
		{
			_errorList: [
				{ message: 'Das Feld Name ist ein Pflichtfeld.', selector: '#name' },
				{ message: 'Die E-Mail-Adresse ist ungültig.', selector: '#email' },
			],
		} as FormProps,
	],
);
