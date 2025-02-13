import { KolAccordionTag } from '../../../core/component-names';
import type { AccordionProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolAccordion } from '../shadow';

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
	],
);
