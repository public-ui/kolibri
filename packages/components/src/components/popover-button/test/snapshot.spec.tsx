import { KolPopoverButton } from '../shadow';
import type { PopoverButtonProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolPopoverButtonTag } from '../../../core/component-names';

executeSnapshotTests<PopoverButtonProps>(KolPopoverButtonTag, [KolPopoverButton], [{ _label: 'Click to toggle' }]);
