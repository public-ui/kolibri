import { KolButtonLinkTag } from '../../../core/component-names';
import type { ButtonLinkProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolButtonLink } from '../shadow';

executeSnapshotTests<ButtonLinkProps>(KolButtonLinkTag, [KolButtonLink], [{ _label: 'Beschreibung' }]);
