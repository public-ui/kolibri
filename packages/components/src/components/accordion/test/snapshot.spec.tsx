import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getAccordionHtml } from './html.mock';

import type { AccordionProps } from '@public-ui/schema';
import type { SpecPage } from '@stencil/core/testing';

executeTests<AccordionProps>(
	'Accordion',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-accordion {...props} />,
		});
		return page;
	},
	{
		_label: ['Überschrift'],
		// _level: [1, 2, 3, 4, 5, 6],
		// _open: [true, false],
	},
	getAccordionHtml,
	{
		execMode: 'default', // ready
	}
);
