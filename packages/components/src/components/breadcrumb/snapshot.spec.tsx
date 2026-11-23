import { KolBreadcrumbTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';

import { KolBreadcrumb } from './component';

executeSnapshotTests(
	KolBreadcrumbTag,
	[KolBreadcrumb],
	[
		{ _label: 'Aria-Label', _links: [{ _href: 'https://example.com', _label: 'Label' }] },
		{
			_label: 'Aria-Label',
			_links: [
				{ _href: 'https://example.com', _label: 'Label 1' },
				{ _href: 'https://example.com', _label: 'Label 2' },
			],
		},

		{
			_label: 'Aria-Label',
			_links: [
				{ _href: 'https://example.com', _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
				{ _href: 'https://example.com', _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
			],
		},
	],
);
