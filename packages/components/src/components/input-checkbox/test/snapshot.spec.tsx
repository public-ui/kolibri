import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputCheckboxHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputCheckboxProps, InputColorProps } from '@public-ui/schema';
import { KolInputCheckbox } from '../component';

executeTests<InputCheckboxProps>(
	'InputCheckbox',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputCheckbox],
			template: () => <kol-input-checkbox {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_hideLabel: [true, false],
		_disabled: [true, false],
		_alert: [true, false],
		_readOnly: [true, false],
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
	getInputCheckboxHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
