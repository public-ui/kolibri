import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getFormHtml } from './html.mock';
import { KolFormTag } from '../../../core/component-names';

executeTests<Props>(
	'Form',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolFormTag {...props} />,
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
