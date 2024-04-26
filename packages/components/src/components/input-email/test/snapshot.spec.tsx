import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputEmailHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputEmailProps } from '@public-ui/schema';
import { KolInputEmail } from '../component';

executeTests<InputEmailProps>(
	'InputEmail',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputEmail],
			template: () => <kol-input-email {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_hideLabel: [true, false],
		_disabled: [true, false],
		_alert: [true, false],
		_icons: [[{ left: 'codicon codicon-home' }]],
		_readOnly: [true, false],
		_msg: [{ _type: 'error', _description: 'Error message' }],
		_required: [true, false],
		_touched: [true, false],
		_smartButton: [
			{
				_icons: ['codicon codicon-eye'],
				_hideLabel: true,
				_label: 'einblenden',
			},
		],
	},
	getInputEmailHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
