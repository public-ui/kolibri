import { KolButtonGroupTag } from '@component-names';
// import type { ButtonGroupAPI } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolButtonGroup } from '../shadow';
import { KolButtonGroupWc } from '../component';

executeSnapshotTests(KolButtonGroupTag, [KolButtonGroup, KolButtonGroupWc], [{}]);
