import React from 'react';
import { KolAccordion, KolButton } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

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
	<>
		<SampleDescription></SampleDescription>
		<div className="grid gap-4">
			{LIST.map(({ heading, content }, index) => (
				<KolAccordion _heading={heading} _level={1} _open={index === 1} key={index}>
					<p slot="header">
						<KolButton _label={'Bearbeiten'} />
					</p>
					<p slot="content">{content}</p>
				</KolAccordion>
			))}
		</div>
	</>
);
