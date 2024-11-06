import { KolBreadcrumbTag } from '@component-names';
import type { BreadcrumbProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolBreadcrumb } from '../shadow';

executeSnapshotTests<BreadcrumbProps>(KolBreadcrumbTag, [KolBreadcrumb], [{ _label: 'Aria-Label', _links: [{ _href: 'www.google.de', _label: 'Label' }] }]);
