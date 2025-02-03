import { KolHeadingTag } from '../../../core/component-names';
import type { HeadingProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolHeading } from '../shadow';

executeSnapshotTests<HeadingProps>(
	KolHeadingTag,
	[KolHeading],
	[
		{ _label: 'Headline' },
		...[0, 1, 2, 3, 4, 5, 6].map((_level) => ({ _label: 'Headline', _level }) as HeadingProps),
		...['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong'].map((_variant) => ({ _label: 'Headline', _variant }) as HeadingProps),
	],
);
