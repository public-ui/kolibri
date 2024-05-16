import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getPaginationHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { PaginationProps } from '../../../schema';
import { KolPagination } from '../component';

executeTests<PaginationProps>(
	'Pagination',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolPagination],
			template: () => <kol-pagination {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_page: [4, 1],
		_max: [0, 2],
		_on: [{}],
		_siblingCount: [0],
		_hasButtons: [false],
	},
	getPaginationHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
