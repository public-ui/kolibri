import { KolTreeItemTag } from '../../../core/component-names';
import type { TreeItemProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTreeItemWc } from '../component';
import { KolTreeItem } from '../shadow';

executeSnapshotTests<TreeItemProps>(
	KolTreeItemTag,
	[KolTreeItem, KolTreeItemWc],
	[
		{ _label: 'Label', _href: 'https://example.com' },
		{ _label: 'Label', _href: 'https://example.com', _open: false },
		{ _label: 'Label', _href: 'https://example.com', _open: true },
		{ _label: 'Label', _href: 'https://example.com', _active: false },
		{ _label: 'Label', _href: 'https://example.com', _active: true },
	],
);
