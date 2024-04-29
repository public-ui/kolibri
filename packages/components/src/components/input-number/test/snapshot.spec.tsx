import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputNumberHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputNumberProps } from '@public-ui/schema';
import { KolInputNumber } from '../component';

executeTests<InputNumberProps>(
	'InputNumber',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputNumber],
			template: () => <kol-input-number {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_alert: [true, false],
		_icons: [[{ left: 'codicon codicon-home' }]],
		_readOnly: [true, false],
		_required: [true, false],
		_touched: [true, false],
		_max: [10],
		_min: [10],
		_step: [1, 2],
	},
	getInputNumberHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
