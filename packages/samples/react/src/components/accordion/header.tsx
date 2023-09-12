import React from 'react';
import { KolAccordion } from '@public-ui/react';

import { FC } from 'react';

export const AccordionHeader: FC = () => (
	<div className="grid gap-4">
		<KolAccordion _heading="Accordion mit Header" _level={1} _open>
			<div slot="header">Hier kann noch was in den Header</div>
			<div slot="content">
				Dieser Inhalt wird direkt beim Laden der Seite angezeigt.
				<br />
				Mit Klick auf die Überschrift wird der Inhalt versteckt.
			</div>
		</KolAccordion>
	</div>
);
