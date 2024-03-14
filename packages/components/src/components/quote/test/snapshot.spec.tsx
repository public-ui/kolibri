import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getQuoteHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { QuoteProps } from '@public-ui/schema';

executeTests<QuoteProps>(
	'Quote',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-quote {...props} />,
		});
		return page;
	},
	{
		_label: ['Caption'],
		_href: ['https://www.example.com'],
		_quote: ['Text of the Quote'],
		_variant: ['block', 'inline'],
	},
	getQuoteHtml,
);
