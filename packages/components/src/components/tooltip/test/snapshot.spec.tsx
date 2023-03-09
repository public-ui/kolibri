import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getTooltipHtml } from './html.mock';

executeTests<Props>(
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
