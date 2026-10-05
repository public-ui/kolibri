import { KolPopoverButtonTag } from '../../../core/component-names';
import type { PopoverButtonProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolPopoverButton } from '../component';
import { KolPopoverButtonWc } from '../wc';

executeSnapshotTests<PopoverButtonProps>(
	KolPopoverButtonTag,
	[KolPopoverButton, KolPopoverButtonWc],
	[
		{ _label: 'Click to toggle' },

		{ _label: 'Click to toggle', _disabled: true },

		{ _label: 'Click to toggle', _icons: 'kolicon-alert-info', _hideLabel: true },

		{ _label: 'Click to toggle', _inline: true },

		{ _label: 'Click to toggle', _popoverAlign: 'top' },
	],
);
