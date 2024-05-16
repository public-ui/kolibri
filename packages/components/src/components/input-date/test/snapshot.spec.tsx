import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputDateHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputDateProps } from '../../../schema';
import { KolInputDate } from '../shadow';

executeTests<InputDateProps>(
	'InputDate',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputDate],
			template: () => <kol-input-date {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_hideLabel: [true, false],
		_disabled: [true, false],
		_alert: [true, false],
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
	getInputDateHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
