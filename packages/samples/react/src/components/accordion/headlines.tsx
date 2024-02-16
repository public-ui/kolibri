import React from 'react';

import { KolAccordion } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const AccordionHeadlines: FC = () => (
	<>
		<SampleDescription>
			<p>Beim klicken mit der Maus auf die einzelnen Überschriften, soll der Inhalt darunter aufgeklappt und beim erneuten klicken wieder zugeklappt werden.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolAccordion _label="Überschrift Level 1" _level={1}>
				<div slot="">Inhalt Accordion Tab 1</div>
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 2" _level={2}>
				<div slot="">Inhalt Accordion Tab 2</div>
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 3" _level={3}>
				<div slot="">Inhalt Accordion Tab 3</div>
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 4" _level={4}>
				<div slot="">Inhalt Accordion Tab 4</div>
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 5" _level={5}>
				<div slot="">Inhalt Accordion Tab 5</div>
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 6" _level={6}>
				<div slot="">Inhalt Accordion Tab 6</div>
			</KolAccordion>
		</div>
	</>
);
