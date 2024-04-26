import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputPasswordHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputPasswordProps } from '@public-ui/schema';
import { KolInputPassword } from '../component';

executeTests<InputPasswordProps>(
	'InputPassword',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputPassword],
			template: () => <kol-input-password {...props} />,
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
	},
	getInputPasswordHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
