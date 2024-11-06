import { KolNavTag } from '@component-names';
import type { NavProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolNav } from '../shadow';

const baseObj: NavProps = {
	_label: 'Nav Label',
	_links: [
		{
			_label: 'Homepage',
			_href: '#',
		},
		{
			_label: 'Nav - aria-current',
			_href: '#',
			_active: true,
		},
		{
			_label: '3 Navigation point',
			_href: '#',
			_icons: 'codicon codicon-home',

			_children: [
				{
					_label: '3.1 Navigation point',
					_icons: 'codicon codicon-home',
					_href: '#',
				},
			],
		},

		{
			_label: '6 Keine eigene Seite, mit Icon',
			_icons: 'codicon codicon-squirrel',
		},
	],
};

executeSnapshotTests<NavProps>(
	KolNavTag,
	[KolNav],
	[
		{ ...baseObj },
		{ ...baseObj, _hasIconsWhenExpanded: false },
		{ ...baseObj, _hasIconsWhenExpanded: true },
		{ ...baseObj, _hideLabel: false },
		{ ...baseObj, _hideLabel: true },
		{ ...baseObj, _hasCompactButton: false },
		{ ...baseObj, _hasCompactButton: true },
	],
);
