import React from 'react';

import { KolAccordion } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const AccordionBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolAccordion hides its content until opened. The open state can be toggled by clicking the headline or by setting the <code>_open</code>-prop
				programmatically. Additionally, the sample shows the disabled state for a closed and an open accordion.
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolAccordion _label="Heading Accordion Tab 1 (open)" _open>
				Contents Accordion Tab 1
			</KolAccordion>
			<KolAccordion _label="Heading Accordion Tab 2">Contents Accordion Tab 2</KolAccordion>
			<KolAccordion _label="Heading Accordion Tab 3 (deactivated)" _disabled>
				Contents Accordion Tab 3
			</KolAccordion>
			<KolAccordion _label="Heading Accordion Tab 4 (disabled and open)" _disabled _open>
				Contents Accordion Tab 4
			</KolAccordion>
		</div>
	</>
);
