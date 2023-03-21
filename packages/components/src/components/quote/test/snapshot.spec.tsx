import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../types';
import { getQuoteHtml } from './html.mock';

executeTests<Props>(
	'Quote',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-quote {...props} />,
		});
		return page;
	},
	{
		_caption: ['Caption'],
		_cite: ['https://www.example.com'],
		_quote: ['Text of the Quote'],
		_variant: ['block', 'inline'],
	},
	getQuoteHtml
);
