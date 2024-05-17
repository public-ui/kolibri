import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getAlertHtml } from './html.mock';

import type { AlertProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolAlert } from '../shadow';
import { KolAlertWc } from '../component';

executeTests<AlertProps>(
	'Alert',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolAlert, KolAlertWc],
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
