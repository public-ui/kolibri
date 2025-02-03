import { KolBreadcrumbTag } from '../../../core/component-names';
import type { BreadcrumbProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolBreadcrumb } from '../shadow';

executeSnapshotTests<BreadcrumbProps>(
	KolBreadcrumbTag,
	[KolBreadcrumb],
	[{ _label: 'Aria-Label', _links: [{ _href: 'https://example.com', _label: 'Label' }] }],
);
