import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getComboboxHtml } from './html.mock';

import type { ComboboxProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolCombobox } from '../shadow';

executeTests<ComboboxProps>(
	'Combobox',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolCombobox],
			template: () => <kol-combobox {...props} />,
		});
		return page;
	},
	{
		_hideError: [false, true],
		_label: ['Label'],
		_suggestions: ['Frau', 'Herr', 'Divers'],
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
		_required: [false, true],
		_touched: [false, true],
	},
	getComboboxHtml,
	{
		execMode: 'default', // ready
		needTimers: true,
	},
);
