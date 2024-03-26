import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getTooltipHtml } from './html.mock';
import { KolTooltipWcTag } from '../../../core/component-names';

executeTests<Props>(
	'Tooltip',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolTooltipWcTag {...props} />,
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
	},
);
