import { KolAccordionTag } from '../../../../internals/src/core/component-names';
import type { AccordionProps } from '../../../../internals/src/schema/index';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolAccordion } from '../component';

const baseObject = { _label: 'Überschrift' };

executeSnapshotTests<AccordionProps>(
	KolAccordionTag,
	[KolAccordion],
	[
		{ ...baseObject },
		{ ...baseObject, _level: 3 },
		{ ...baseObject, _open: false, _disabled: false },
		{ ...baseObject, _open: false, _disabled: true },
		{ ...baseObject, _open: true, _disabled: true },
		{ ...baseObject, _open: true, _disabled: false },
		{ _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] },
	],
);
