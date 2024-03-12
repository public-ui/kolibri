import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getAlertHtml } from './html.mock';

executeTests<Props>(
	'Alert',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-alert {...props} />,
		});
		return page;
	},
	{
		_alert: [false, true],
		_label: ['Überschrift'],
		_level: [1, 2, 3, 4, 5, 6],
		_type: ['default', 'error', 'info', 'success', 'warning'],
	},
	getAlertHtml,
	{
		needTimers: true,
	},
);
