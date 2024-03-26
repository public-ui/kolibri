import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getAccordionHtml } from './html.mock';
import { KolAccordionTag } from '../../../core/component-names';

executeTests<Props>(
	'Accordion',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
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
