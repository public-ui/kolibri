import { KolSkipNavTag } from '@component-names';
import type { SkipNavProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolSkipNav } from '../shadow';

executeSnapshotTests<SkipNavProps>(
	KolSkipNavTag,
	[KolSkipNav],
	[
		{
			_label: 'Label',
			_links: [
				{ _href: 'www.google.de', _label: 'Zum Anfang' },
				{
					_href: 'www.google.de',
					_label: 'Zum Formular',
				},
				{
					_href: 'www.google.de',
					_label: 'Zum Ende',
				},
			],
		},
	],
);
