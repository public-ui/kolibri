import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInpuRangeHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputRangeProps } from '@public-ui/schema';
import { KolInputRange } from '../component';

executeTests<InputRangeProps>(
	'InputText',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputRange],
			template: () => <kol-input-range {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_disabled: [true, false],
		_placeholder: ['Mit Icons'],
		_alert: [true, false],
		_icons: [[{ left: 'codicon codicon-home' }]],
		_readOnly: [true, false],
		_required: [true, false],
		_touched: [true, false],
		_accessKey: ['V'],
		_max: [10],
		_min: [10],
	},
	getInpuRangeHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
