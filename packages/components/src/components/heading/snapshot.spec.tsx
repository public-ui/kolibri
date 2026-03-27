import { KolHeadingTag } from '../../core/component-names';
import type { HeadingProps } from '../../schema';
import { executeSnapshotTests } from '../../utils/testing';

import { KolHeading } from './component';

executeSnapshotTests<HeadingProps>(
	KolHeadingTag,
	[KolHeading],
	[
		{ _label: 'Headline' },
		{ _label: 'Headline', _secondaryHeadline: 'Subheadline' },
		...[0, 1, 2, 3, 4, 5, 6].map((_level) => ({ _label: 'Headline', _level }) as HeadingProps),
	],
);
