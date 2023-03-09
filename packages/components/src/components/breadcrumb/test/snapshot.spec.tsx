import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { executeTests } from 'stencil-awesome-test';

import { COMPONENTS } from '../../component-list';
import { Props } from '../component';
import { getBreadcrumbHtml } from './html.mock';

executeTests<Props>(
	'Breadcrumb',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-breadcrumb {...props} />,
		});
		return page;
	},
	{
		_ariaLabel: ['Aria-Label'],
		_links: [[], [{ _label: 'Label' }]],
	},
	getBreadcrumbHtml,
	{
		execMode: 'default', // ready
	}
);
