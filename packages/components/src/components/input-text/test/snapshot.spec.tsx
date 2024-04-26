import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInpuTextHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputTextProps } from '@public-ui/schema';
import { KolInputText } from '../component';

executeTests<InputTextProps>(
	'InputText',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text {...props} />,
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
		_type: ['search', 'text'],
		_accessKey: ['V'],
	},
	getInpuTextHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
