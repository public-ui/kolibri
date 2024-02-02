import type { FC } from 'react';
import React from 'react';

import { KolAccordion } from '@public-ui/react';

const LIST = [
	{
		heading: 'Überschrift Accordion Tab 1',
		content: 'Inhalt Accordion Tab 1',
	},
	{
		heading: 'Überschrift Accordion Tab 2',
		content: 'Inhalt Accordion Tab 2',
	},
	{
		heading: 'Überschrift Accordion Tab 3',
		content: 'Inhalt Accordion Tab 3',
	},
];

export const AccordionList: FC = () => (
	<div className="grid gap-4">
		{LIST.map(({ heading, content }, index) => (
			<KolAccordion _label={heading} _level={1} _open={index === 1} key={index}>
				<p>{content}</p>
			</KolAccordion>
		))}
	</div>
);
