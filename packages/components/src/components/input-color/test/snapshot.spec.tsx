import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputColorHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputColorProps } from '@public-ui/schema';
import { KolInputColor } from '../component';

executeTests<InputColorProps>(
	'InputColor',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputColor],
			template: () => <kol-input-color {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_hideLabel: [true, false],
		_disabled: [true, false],
		_alert: [true, false],
		_icons: [[{ left: 'codicon codicon-home' }]],
		_touched: [true, false],
		_smartButton: [
			{
				_icons: ['codicon codicon-eye'],
				_hideLabel: true,
				_label: 'einblenden',
			},
		],
	},
	getInputColorHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
