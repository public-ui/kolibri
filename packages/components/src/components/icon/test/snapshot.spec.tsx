import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getIconHtml } from './html.mock';

executeTests<Props>(
	'Icon',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-icon {...props} />,
		});
		return page;
	},
	{
		_ariaLabel: ['Aria-Label'],
		_icon: ['codicon codicon-home'],
	},
	getIconHtml,
	{
		execMode: 'default', // ready
	}
);
