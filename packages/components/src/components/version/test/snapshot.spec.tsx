import { KolVersionTag } from '../../../core/component-names';
import type { VersionProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolVersion } from '../shadow';

executeSnapshotTests<VersionProps>(KolVersionTag, [KolVersion], [{ _label: '1.0.0' }]);
