import { KolPopoverButtonTag } from '../../../core/component-names';
import type { PopoverButtonProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolPopoverButton } from '../shadow';

executeSnapshotTests<PopoverButtonProps>(KolPopoverButtonTag, [KolPopoverButton], [{ _label: 'Click to toggle' }]);
