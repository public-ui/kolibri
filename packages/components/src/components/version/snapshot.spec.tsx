import { KolVersionTag } from '../../../internals/src/core/component-names';
import type { VersionProps } from '../../../internals/src/schema/index';
import { executeSnapshotTests } from '../../utils/testing';
import { KolVersion } from './component';

executeSnapshotTests<VersionProps>(KolVersionTag, [KolVersion], [{ _label: '1.0.0' }]);
