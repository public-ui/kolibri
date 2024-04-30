import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getAccordionHtml } from './html.mock';

import type { AccordionProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolAccordion } from '../component';

executeTests<AccordionProps>(
	'Accordion',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolAccordion],
			template: () => <kol-accordion {...props} />,
		});
		return page;
	},
	{
		_disabled: [true, false],
		_label: ['Überschrift'],
		_level: [1, 2, 3, 4, 5, 6],
		_open: [true, false],
	},
	getAccordionHtml,
	{
		execMode: 'default', // ready
	},
);
