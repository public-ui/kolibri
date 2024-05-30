import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getTooltipHtml } from './html.mock';

import type { TooltipProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolTooltipWc } from '../component';

executeTests<TooltipProps>(
	'Tooltip',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolTooltipWc],
			template: () => <kol-tooltip-wc {...props} />,
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
