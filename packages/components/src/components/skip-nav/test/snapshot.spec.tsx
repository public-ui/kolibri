import { KolSkipNavTag } from '../../../core/component-names';
import type { SkipNavProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolSkipNav } from '../shadow';

executeSnapshotTests<SkipNavProps>(
	KolSkipNavTag,
	[KolSkipNav],
	[
		{
			_label: 'Label',
			_links: [
				{ _href: 'https://example.com', _label: 'Zum Anfang' },
				{
					_href: 'https://example.com',
					_label: 'Zum Formular',
				},
				{
					_href: 'https://example.com',
					_label: 'Zum Ende',
				},
			],
		},
	],
);
