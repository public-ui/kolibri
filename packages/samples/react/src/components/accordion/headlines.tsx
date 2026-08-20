import type { FC } from 'react';
import React from 'react';

import { KolAccordion } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

export const AccordionHeadlines: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolAccordion with the different heading levels from 1-6.</p>
		</SampleDescription>

		<div className="grid gap-4" data-visual-block="headlines">
			<KolAccordion _label="Heading Level 1" _level={1}>
				<p>Contents Accordion Tab 1</p>
			</KolAccordion>
			<KolAccordion _label="Heading Level 2" _level={2}>
				<p>Contents Accordion Tab 2</p>
			</KolAccordion>
			<KolAccordion _label="Heading Level 3" _level={3}>
				<p>Contents Accordion Tab 3</p>
			</KolAccordion>
			<KolAccordion _label="Heading Level 4" _level={4}>
				<p>Contents Accordion Tab 4</p>
			</KolAccordion>
			<KolAccordion _label="Heading Level 5" _level={5}>
				<p>Contents Accordion Tab 5</p>
			</KolAccordion>
			<KolAccordion _label="Heading Level 6" _level={6}>
				<p>Contents Accordion Tab 6</p>
			</KolAccordion>
		</div>
	</>
);
