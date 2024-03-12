import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getSpinHtml } from './html.mock';

executeTests<Props>(
	'Spin',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-spin {...props} />,
		});
		return page;
	},
	{
		_show: [false, true],
	},
	getSpinHtml,
	{
		execMode: 'default', // ready
	},
);
