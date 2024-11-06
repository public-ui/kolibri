import { KolAccordionTag } from '@component-names';
import type { AccordionProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolAccordion } from '../shadow';

// _disabled: [true, false],
// _label: ['Überschrift'],
// _level: [1, 2, 3, 4, 5, 6],
// _open: [true, false],

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
