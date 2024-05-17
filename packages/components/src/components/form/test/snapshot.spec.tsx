import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getFormHtml } from './html.mock';

import type { FormProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolForm } from '../shadow';

executeTests<FormProps>(
	'Form',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolForm],
			template: () => <kol-form {...props} />,
		});
		return page;
	},
	{
		_requiredText: ['Pflichtfeld'],
	},
	getFormHtml,
	{
		execMode: 'skip',
	},
);
