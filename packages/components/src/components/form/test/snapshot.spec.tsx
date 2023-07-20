import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { KoliBriFormProps } from '../types';
import { getFormHtml } from './html.mock';

executeTests<KoliBriFormProps>(
	'Form',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
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
	}
);
