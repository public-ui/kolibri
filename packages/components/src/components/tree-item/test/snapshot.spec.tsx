import { KolTreeItemTag } from '@component-names';
import type { TreeItemProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolTreeItem } from '../shadow';
import { KolTreeItemWc } from '../component';

executeSnapshotTests<TreeItemProps>(
	KolTreeItemTag,
	[KolTreeItem, KolTreeItemWc],
	[
		{ _label: 'Label', _href: 'https://google.de' },
		{ _label: 'Label', _href: 'https://google.de', _open: false },
		{ _label: 'Label', _href: 'https://google.de', _open: true },
		{ _label: 'Label', _href: 'https://google.de', _active: false },
		{ _label: 'Label', _href: 'https://google.de', _active: true },
	],
);
