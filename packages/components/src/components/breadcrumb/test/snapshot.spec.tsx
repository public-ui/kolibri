import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getBreadcrumbHtml } from './html.mock';
import { KolBreadcrumbTag } from '../../../core/component-names';

executeTests<Props>(
	'Breadcrumb',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolBreadcrumbTag {...props} />,
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
