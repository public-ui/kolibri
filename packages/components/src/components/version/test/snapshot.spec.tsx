import { KolVersionTag } from '../../../core/component-names';
import type { VersionProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolVersion } from '../component';

executeSnapshotTests<VersionProps>(KolVersionTag, [KolVersion], [{ _label: '2.0.0' }]);
