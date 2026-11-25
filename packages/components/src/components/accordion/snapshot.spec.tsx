import { KolAccordionTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';
import { KolAccordion } from './component';

const baseObject = { _label: 'Überschrift' };

executeSnapshotTests(
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
