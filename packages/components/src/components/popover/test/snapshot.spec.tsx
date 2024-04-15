import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getPopoverHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { PopoverProps } from '@public-ui/schema';
import { KolPopover } from '../component';

executeTests<PopoverProps>(
	'Popover',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolPopover],
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
	},
);
