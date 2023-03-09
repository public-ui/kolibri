import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getToastHtml } from './html.mock';

executeTests<Props>(
	'Toast',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-toast {...props} />,
		});
		return page;
	},
	{
		_show: [false, true],
		_alert: [false, true],
		_heading: ['Überschrift'],
		_level: [1, 2, 3, 4, 5, 6],
		_type: ['default', 'error', 'info', 'success', 'warning'],
	},
	getToastHtml,
	{
		needTimers: true,
	}
);
