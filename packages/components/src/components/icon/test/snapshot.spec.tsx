import { KolIconTag } from '../../../core/component-names';
import type { IconProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolIcon } from '../shadow';

executeSnapshotTests<IconProps>(KolIconTag, [KolIcon], [{ _label: 'Aria-Label', _icons: 'codicon codicon-home' }]);
