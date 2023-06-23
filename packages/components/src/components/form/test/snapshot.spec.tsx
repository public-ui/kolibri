import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { executeTests } from 'stencil-awesome-test';

import { COMPONENTS } from '../../component-list';
import { getFormHtml } from './html.mock';
import { KoliBriFormProps } from '../types';

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
