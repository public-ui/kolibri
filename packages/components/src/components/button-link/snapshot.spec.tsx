import { KolButtonLinkTag } from '../../../internals/src/core/component-names';
import type { ButtonLinkProps } from '../../../internals/src/schema/index';
import { executeSnapshotTests } from '../../utils/testing';

import { KolButtonLink } from './component';

executeSnapshotTests<ButtonLinkProps>(
	KolButtonLinkTag,
	[KolButtonLink],
	[{ _label: 'Beschreibung' }, { _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] }],
);
