import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getToastHtml } from './html.mock';
import { KolToastTag } from '../../../core/component-names';

executeTests<Props>(
	'Toast',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolToastTag {...props} />,
		});
		return page;
	},
	{
		_alert: [false, true],
		_label: ['Überschrift'],
		_level: [1, 2, 3, 4, 5, 6],
		_show: [false, true],
		_type: ['default', 'error', 'info', 'success', 'warning'],
	},
	getToastHtml,
	{
		needTimers: true,
	},
);
