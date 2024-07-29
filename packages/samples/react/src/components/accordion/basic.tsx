import React from 'react';
import { KolAccordion } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const AccordionBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolAccordion hides its content until opened. The open state can be toggled by clicking the headline or by setting the <code>_open</code>-prop
				programmatically. Additionally, the sample shows the disabled state for a closed and an open accordion.
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolAccordion _heading="Überschrift Accordion Tab 1" _level={1}>
				<div slot="content">Inhalt Accordion Tab 1</div>
			</KolAccordion>
			<KolAccordion _heading="Überschrift Accordion Tab 2" _level={1} _open>
				<div slot="content">Inhalt Accordion Tab 2</div>
			</KolAccordion>
			<KolAccordion _heading="Überschrift Accordion Tab 3" _level={1}>
				<div slot="content">Inhalt Accordion Tab 3</div>
			</KolAccordion>
		</div>
	</>
);
