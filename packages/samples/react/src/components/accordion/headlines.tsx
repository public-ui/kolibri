import type { FC } from 'react';
import React from 'react';

import { KolAccordion } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const AccordionHeadlines: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolAccordion with the different heading levels from 1-6.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolAccordion _label="Heading Level 1" _level={1}>
				Contents Accordion Tab 1
			</KolAccordion>
			<KolAccordion _label="Heading Level 2" _level={2}>
				Contents Accordion Tab 2
			</KolAccordion>
			<KolAccordion _label="Heading Level 3" _level={3}>
				Contents Accordion Tab 3
			</KolAccordion>
			<KolAccordion _label="Heading Level 4" _level={4}>
				Contents Accordion Tab 4
			</KolAccordion>
			<KolAccordion _label="Heading Level 5" _level={5}>
				Contents Accordion Tab 5
			</KolAccordion>
			<KolAccordion _label="Heading Level 6" _level={6}>
				Contents Accordion Tab 6
			</KolAccordion>
		</div>
	</>
);
