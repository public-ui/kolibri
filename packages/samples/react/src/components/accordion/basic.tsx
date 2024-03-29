import React from 'react';

import { KolAccordion } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

export const AccordionBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Beim klicken mit der Maus auf die einzelnen Überschriften, soll der Inhalt darunter aufgeklappt und beim erneuten klicken wieder zugeklappt werden.</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolAccordion _label="Überschrift Accordion Tab 1" _level={1}>
				<div slot="">Inhalt Accordion Tab 1</div>
			</KolAccordion>
			<KolAccordion _disabled _label="Überschrift Accordion Tab 2 (deaktiviert)" _level={1} _open>
				<div slot="">Inhalt Accordion Tab 2</div>
			</KolAccordion>
			<KolAccordion _label="Überschrift Accordion Tab 3" _level={1}>
				<div slot="">Inhalt Accordion Tab 3</div>
			</KolAccordion>
		</div>
	</>
);
