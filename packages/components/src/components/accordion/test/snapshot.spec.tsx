import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../types';
import { getAccordionHtml } from './html.mock';

executeTests<Props>(
	'Accordion',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-accordion {...props} />,
		});
		return page;
	},
	{
		_heading: ['Überschrift'],
		// _level: [1, 2, 3, 4, 5, 6],
		// _open: [true, false],
	},
	getAccordionHtml,
	{
		execMode: 'default', // ready
	}
);
