import { KolModalTag } from '../../../core/component-names';
import type { ModalProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolModal } from '../shadow';

executeSnapshotTests<ModalProps>(KolModalTag, [KolModal], [{ _label: 'Label', _width: '80%' }]);
