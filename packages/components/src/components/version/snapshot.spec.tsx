import { KolVersionTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';
import { KolVersion } from './component';

executeSnapshotTests(KolVersionTag, [KolVersion], [{ _label: '1.0.0' }]);
