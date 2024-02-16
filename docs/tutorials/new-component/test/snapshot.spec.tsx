import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../types';
import { getNewComponentHtml } from './html.mock';

executeTests<Props>(
	'NewComponent',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-new-component {...props} />,
		});
		return page;
	},
	{
		_heading: ['Überschrift'],
		// _level: [1, 2, 3, 4, 5, 6],
		// _open: [true, false],
	},
	getNewComponentHtml,
	{
		execMode: 'default', // ready
	}
);
