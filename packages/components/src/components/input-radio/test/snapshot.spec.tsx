import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputRadioHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputRadioProps } from '../../../schema';
import { KolInputRadio } from '../component';

executeTests<InputRadioProps>(
	'InputRadio',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputRadio],
			template: () => <kol-input-radio {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_disabled: [true, false],
		_alert: [true, false],
		_required: [true, false],
		_touched: [true, false],
		_options: [
			[
				{ label: 'Field 1', value: 1 },
				{ label: 'Field 2', value: 2 },
			],
			[{ label: 'Field 1', value: { id: 1, name: 'Option 1' } }],
		],
	},
	getInputRadioHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
