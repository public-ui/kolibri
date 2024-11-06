import { KolLinkButtonTag } from '@component-names';
import type { LinkButtonProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolLinkButton } from '../shadow';

// _disabled: [true, false],
// _href: ['https://google.de'],
// _icons: ['codicon codicon-home'],
// _hideLabel: [false, true],
// _label: ['Label'],
// _target: ['_self', '_blank', 'egal'],
// _tooltipAlign: ['top', 'right', 'bottom', 'left'],
// _download: ['', 'download-file.zip'],

const baseObj = { _href: 'https://google.de', _icons: 'codicon codicon-home', _label: 'Label', _target: 'self' };

executeSnapshotTests<LinkButtonProps>(
	KolLinkButtonTag,
	[KolLinkButton],
	[
		{ ...baseObj },
		{ ...baseObj, _tooltipAlign: 'top' },
		{ ...baseObj, _tooltipAlign: 'left' },
		{ ...baseObj, _tooltipAlign: 'right' },
		{ ...baseObj, _tooltipAlign: 'bottom' },

		{ ...baseObj, _tooltipAlign: 'top', _hideLabel: true },

		{ _label: 'Label', _href: '', _download: 'download-file.zip', _target: 'blank' },
	],
);
