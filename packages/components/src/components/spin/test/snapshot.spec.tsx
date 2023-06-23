import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getSpinHtml } from './html.mock';
import { KoliBriSpinProps } from '../types';

executeTests<KoliBriSpinProps>(
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
	}
);
