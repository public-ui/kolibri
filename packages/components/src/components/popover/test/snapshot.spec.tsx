import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getPopoverHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { PopoverProps } from '@public-ui/schema';

executeTests<PopoverProps>(
	'Popover',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-popover-wc {...props} />,
		});
		return page;
	},
	{
		_align: ['top', 'right', 'bottom', 'left'],
	},
	getPopoverHtml,
	{
		execMode: 'default', // ready
	}
);
