import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getFormLoginHtml } from './html.mock';
import { Props } from '../schema';

executeTests<Props>(
	'FormLogin',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <my-form-login {...props} />,
		});
		return page;
	},
	{
		_heading: ['Hello world!'],
	},
	getFormLoginHtml,
	{
		execMode: 'default',
	}
);
