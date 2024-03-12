import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getIndentedTextHtml } from './html.mock';

executeTests<Props>(
	'Heading',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-indented-text {...props} />,
		});
		return page;
	},
	{},
	getIndentedTextHtml,
	{
		execMode: 'default', // ready
	},
);
