import React from 'react';
import { KolAccordion } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const AccordionBasic: FC = () => (
	<>
		<SampleDescription></SampleDescription>
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
