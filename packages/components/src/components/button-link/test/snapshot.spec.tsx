import { KolButtonLinkTag } from '../../../core/component-names';
import type { ButtonLinkProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolButtonLink } from '../component';

executeSnapshotTests<ButtonLinkProps>(
	KolButtonLinkTag,
	[KolButtonLink],
	[
		{ _label: 'Beschreibung' },

		{ _label: 'Beschreibung', _disabled: true },

		{ _label: 'Beschreibung', _inline: true },
		{ _label: 'Beschreibung', _inline: false },

		{ _label: 'Beschreibung', _hideLabel: true },

		{ _label: 'Beschreibung', _icons: 'codicon codicon-home' },

		{ _label: 'Beschreibung', _accessKey: 'a' },
		{ _label: 'Beschreibung', _shortKey: 'Ctrl+S' },

		{ _label: 'Beschreibung', _variant: 'my-variant' },

		{ _label: 'Beschreibung', _type: 'submit' },

		{ _label: 'Beschreibung', _ariaDescription: 'Aria Description' },
	],
);
