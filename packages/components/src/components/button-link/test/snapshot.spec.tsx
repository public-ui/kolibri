import { KolButtonLinkTag } from '@component-names';
import type { ButtonLinkProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolButtonLink } from '../shadow';

executeSnapshotTests<ButtonLinkProps>(KolButtonLinkTag, [KolButtonLink], [{ _label: 'Beschreibung' }]);
