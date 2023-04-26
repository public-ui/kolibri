import React from 'react';
import { KolAccordion } from '@public-ui/react';

import { FC } from 'react';

export const AccordionHeadlines: FC = () => (
	<div className="grid gap-4">
		<KolAccordion _heading="Überschrift Level 1" _level={1}>
			<div slot="content">Inhalt Accordion Tab 1</div>
		</KolAccordion>
		<KolAccordion _heading="Überschrift Level 2" _level={2}>
			<div slot="content">Inhalt Accordion Tab 2</div>
		</KolAccordion>
		<KolAccordion _heading="Überschrift Level 3" _level={3}>
			<div slot="content">Inhalt Accordion Tab 3</div>
		</KolAccordion>
		<KolAccordion _heading="Überschrift Level 4" _level={4}>
			<div slot="content">Inhalt Accordion Tab 4</div>
		</KolAccordion>
		<KolAccordion _heading="Überschrift Level 5" _level={5}>
			<div slot="content">Inhalt Accordion Tab 5</div>
		</KolAccordion>
		<KolAccordion _heading="Überschrift Level 6" _level={6}>
			<div slot="content">Inhalt Accordion Tab 6</div>
		</KolAccordion>
	</div>
);
