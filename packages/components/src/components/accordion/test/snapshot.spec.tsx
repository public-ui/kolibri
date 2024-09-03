import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Props } from '../types';
import { getAccordionHtml } from './html.mock';
import { KolAccordionTag } from '../../../core/component-names';
import { KolAccordion } from '../component';

executeTests<Props>(
	'Accordion',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolAccordion],
			template: () => <KolAccordionTag {...props} />,
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
	},
);
