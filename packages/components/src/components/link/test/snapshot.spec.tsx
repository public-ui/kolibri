import { KolLinkTag } from '@component-names';
import type { LinkProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolLink } from '../shadow';
import { KolLinkWc } from '../component';

// _disabled: [true, false],
// _href: ['https://google.de'],
// _icons: ['codicon codicon-home'],
// _hideLabel: [false, true],
// _label: ['Label'],
// _target: ['_self', '_blank', 'egal'],
// _tooltipAlign: ['top', 'right', 'bottom', 'left'],
// _download: ['', 'download-file.zip'],

const baseObj = { _href: 'https://google.de', _icons: 'codicon codicon-home', _label: 'Label', _target: 'self' };

executeSnapshotTests<LinkProps>(
	KolLinkTag,
	[KolLink, KolLinkWc],
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
