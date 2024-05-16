import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getSelectHtml } from './html.mock';

import type { SelectProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolSelect } from '../shadow';

executeTests<SelectProps>(
	'Tabs',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolSelect],
			template: () => <kol-select {...props} />,
		});
		return page;
	},
	{
		_hideError: [false, true],
		_options: [
			[
				{
					label: 'Frau',
					value: 'Frau',
					disabled: true,
				},
				{
					label: 'Herr',
					value: 'Herr',
				},
				{
					label: 'Divers',
					value: 'Divers',
				},
			],
		],
		_icons: [
			{
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			},
		],
		_multiple: [false, true],
		_required: [false, true],
		_touched: [false, true],
		_label: ['Label'],
	},
	getSelectHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
