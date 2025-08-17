import React from 'react';

import { KolAccordion, KolPopoverButton } from '@public-ui/react';
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
			<KolAccordion _label="Heading Accordion Tab 1" _open>
				<KolPopoverButton _label="Open popover">
					<p>Popover content extending beyond the accordion boundaries.</p>
				</KolPopoverButton>
			</KolAccordion>
			<KolAccordion _label="Heading Accordion Tab 2">Contents Accordion Tab 2</KolAccordion>
			<KolAccordion _label="Heading Accordion Tab 2 (deactivated)" _disabled></KolAccordion>
			<KolAccordion _label="Heading Accordion Tab 2 (disabled and open)" _disabled _open>
				Contents Accordion Tab 2
			</KolAccordion>
		</div>
	</>
);
