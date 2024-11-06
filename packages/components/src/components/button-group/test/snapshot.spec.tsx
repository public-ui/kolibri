import { KolButtonGroupTag } from '@component-names';
import type { ButtonGroupProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolButtonGroup } from '../shadow';
import { KolButtonGroupWc } from '../component';

executeSnapshotTests<ButtonGroupProps>(KolButtonGroupTag, [KolButtonGroup, KolButtonGroupWc], [{}]);
