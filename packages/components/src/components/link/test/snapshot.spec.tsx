import { KolLinkTag } from '../../../core/component-names';
import type { LinkProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolLinkWc } from '../component';
import { KolLink } from '../shadow';

const baseObj = { _href: 'https://example.com', _icons: 'codicon codicon-home', _label: 'Label', _target: 'self' };

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
