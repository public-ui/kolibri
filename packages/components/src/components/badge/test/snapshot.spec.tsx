import { KolBadgeTag } from '../../../core/component-names';
import type { BadgeProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolBadge } from '../shadow';

executeSnapshotTests<BadgeProps>(
	KolBadgeTag,
	[KolBadge],
	[
		{ _label: 'Text' },
		{ _label: '**Te**xt' },
		{ _label: 'Text', _color: '#000000' },
		{ _label: 'Text', _icons: 'codicon codicon-home' },
		{ _label: 'Text', _icons: 'codicon codicon-home', _color: '#000000' },
	],
);
