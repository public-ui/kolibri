import React from 'react';
import { KolAccordion } from '@public-ui/react';

import { FC } from 'react';

export const AccordionHeader: FC = () => (
	<div className="grid gap-4">
		<KolAccordion _label="Accordion mit Header" _level={1} _open>
			<div>
				Dieser Inhalt wird direkt beim Laden der Seite angezeigt.
				<br />
				Mit Klick auf die Überschrift wird der Inhalt versteckt.
			</div>
		</KolAccordion>
	</div>
);
