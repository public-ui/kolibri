import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { KoliBriTooltipProps } from '../types';
import { getTooltipHtml } from './html.mock';

executeTests<KoliBriTooltipProps>(
	'Tooltip',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-tooltip {...props} />,
		});
		return page;
	},
	{
		_align: ['top', 'right', 'bottom', 'left'],
		_id: ['id'],
		_label: ['Label'],
	},
	getTooltipHtml,
	{
		execMode: 'default', // ready
	}
);
