import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
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
		_label: ['Aria-Label'],
		_links: [[], [{ _label: 'Label' }]],
	},
	getBreadcrumbHtml,
	{
		execMode: 'default', // ready
	},
);
