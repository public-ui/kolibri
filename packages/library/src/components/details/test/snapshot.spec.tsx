import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { executeTests } from 'stencil-awesome-test';

import { COMPONENTS } from '../../component-list';
import { Props } from '../component';
import { getDetailsHtml } from './html.mock';

executeTests<Props>(
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
		execMode: 'skip',
	}
);
