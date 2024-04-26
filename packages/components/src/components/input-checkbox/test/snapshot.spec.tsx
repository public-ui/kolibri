import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputCheckboxHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputCheckboxProps } from '@public-ui/schema';
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
		_required: [true, false],
		_touched: [true, false],
	},
	getInputCheckboxHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
