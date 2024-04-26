import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputFileHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputFileProps } from '@public-ui/schema';
import { KolInputFile } from '../component';

executeTests<InputFileProps>(
	'InputFile',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInputFile],
			template: () => <kol-input-file {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_hideLabel: [true, false],
		_disabled: [true, false],
		_alert: [true, false],
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
	getInputFileHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
