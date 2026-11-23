import { KolSkipNavTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';
import { KolSkipNav } from './component';

executeSnapshotTests(
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
