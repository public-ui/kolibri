import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getBadgeHtml } from './html.mock';

executeTests<Props>(
	'Badge',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-badge {...props} />,
		});
		return page;
	},
	{
		_color: ['#000000'],
		_icon: ['fa-solid fa-house'],
		_iconOnly: [false, true],
		_label: ['Text'],
	},
	getBadgeHtml,
	{
		execMode: 'default', // ready
	}
);
