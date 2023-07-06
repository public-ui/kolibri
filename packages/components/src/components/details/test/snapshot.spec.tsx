import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { KoliBriDetailsProps } from '../types';
import { getDetailsHtml } from './html.mock';

executeTests<KoliBriDetailsProps>(
	'Details',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-details {...props} />,
		});
		return page;
	},
	{
		_summary: ['Zusammenfassung'],
		_open: [false, true],
	},
	getDetailsHtml,
	{
		execMode: 'default', // ready
	}
);
