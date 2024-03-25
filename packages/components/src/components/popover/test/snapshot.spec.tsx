import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getPopoverHtml } from './html.mock';
import { KolPopoverWcTag } from '../../../core/component-names';

executeTests<Props>(
	'Popover',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolPopoverWcTag {...props} />,
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
