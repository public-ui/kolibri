import type { FC } from 'react';
import React from 'react';

import { KolAccordion, KolLink } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const AccordionHeadlines: FC = () => (
	<>
		<SampleDescription>
			<p>
				Complementary to the <KolLink _label="basic" _href="#/accordion/basic" /> sample, this sample shows KolAccordion with the different heading levels from
				1-6.
			</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolAccordion _label="Überschrift Level 1" _level={1}>
				Inhalt Accordion Tab 1
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 2" _level={2}>
				Inhalt Accordion Tab 2
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 3" _level={3}>
				Inhalt Accordion Tab 3
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 4" _level={4}>
				Inhalt Accordion Tab 4
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 5" _level={5}>
				Inhalt Accordion Tab 5
			</KolAccordion>
			<KolAccordion _label="Überschrift Level 6" _level={6}>
				Inhalt Accordion Tab 6
			</KolAccordion>
		</div>
	</>
);
