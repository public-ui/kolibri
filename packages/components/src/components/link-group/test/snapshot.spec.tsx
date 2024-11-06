import { KolLinkGroupTag } from '@component-names';
import type { LinkGroupProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolLinkGroup } from '../shadow';

const baseObj: LinkGroupProps = {
	_label: 'Primary',
	_links: [
		{ _label: 'Link 1', _href: '#' },
		{ _label: 'Link 2', _href: '#' },
		{ _label: 'Link 3', _href: '#' },
	],
};

executeSnapshotTests<LinkGroupProps>(
	KolLinkGroupTag,
	[KolLinkGroup],
	[{ ...baseObj }, { ...baseObj, _orientation: 'horizontal' }, { ...baseObj, _orientation: 'vertical' }, { ...baseObj, _listStyleType: 'square' }],
);
