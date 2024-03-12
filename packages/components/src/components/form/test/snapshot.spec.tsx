import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getFormHtml } from './html.mock';

executeTests<Props>(
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
	},
);
