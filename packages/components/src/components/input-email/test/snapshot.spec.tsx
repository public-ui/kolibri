import { KolInputEmailTag } from '../../../core/component-names';
import type { InputEmailProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputEmail } from '../shadow';

executeInputSnapshotTests<InputEmailProps>(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@example.com',
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests<InputEmailProps>(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@example.com',
		_suggestions: ['email1@example.com', 'email2@example.com', 'email3@example.com'],
	},
	{ hasSmartButton: true },
);
