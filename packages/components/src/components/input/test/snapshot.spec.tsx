import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getInputHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { InputProps } from '@public-ui/schema';
import { KolInput } from '../component';

executeTests<InputProps>(
	'Input',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolInput],
			template: () => <kol-input {...props} />,
		});
		return page;
	},
	{
		_label: ['Label', ''],
		_hideLabel: [true, false],
		_disabled: [true, false],
		_alert: [true, false],
		_icons: [[{ left: 'codicon codicon-home' }]],
		_readOnly: [true, false],
		_smartButton: [
			{
				_icons: ['codicon codicon-eye'],
				_hideLabel: true,
				_label: 'einblenden',
			},
		],
	},
	getInputHtml,
);
