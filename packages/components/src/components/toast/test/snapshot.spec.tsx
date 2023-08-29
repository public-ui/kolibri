import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Props } from '../types';
import { getToastHtml } from './html.mock';
import { KolToast } from '../component';

executeTests<Props>(
	'Toast',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolToast], // Use the stubbed version of child components to work around https://github.com/ionic-team/stencil/issues/3220
			template: () => <kol-toast {...props} />,
		});
		return page;
	},
	{
		_label: ['Überschrift'],
		_type: ['default', 'error', 'info', 'success', 'warning'],
		_status: ['adding', 'settled', 'removing'],
	},
	getToastHtml,
	{
		needTimers: true,
	}
);
