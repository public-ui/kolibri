import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getBreadcrumbHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { BreadcrumbProps } from '../../../schema';
import { KolBreadcrumb } from '../component';

executeTests<BreadcrumbProps>(
	'Breadcrumb',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolBreadcrumb],
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
