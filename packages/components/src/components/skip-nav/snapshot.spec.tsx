import { KolSkipNavTag } from '../../../internals/src/core/component-names';
import type { SkipNavProps } from '../../../internals/src/schema/index';
import { executeSnapshotTests } from '../../utils/testing';
import { KolSkipNav } from './component';

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
				{ _href: 'https://example.com', _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
			],
		},
	],
);
