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
		...([1, 2, 3, 4, 5, 6].map((_level) => ({ ...baseObject, _level })) as AccordionProps[]),
		{ ...baseObject, _level: 1, _open: false, _disabled: false },
		{ ...baseObject, _level: 1, _open: false, _disabled: true },
		{ ...baseObject, _level: 1, _open: true, _disabled: true },
		{ ...baseObject, _level: 1, _open: true, _disabled: false },
	],
);
