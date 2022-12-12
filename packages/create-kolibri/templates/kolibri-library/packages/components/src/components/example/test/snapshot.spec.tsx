import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getExampleHtml } from './html.mock';
import { Props } from '../schema';

executeTests<Props>(
	'Example',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <my-example {...props} />,
		});
		return page;
	},
	{
		_label: ['Hello world!'],
	},
	getExampleHtml,
	{
		execMode: 'default',
	}
);
