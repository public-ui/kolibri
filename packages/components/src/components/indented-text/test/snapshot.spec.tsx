import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getIndentedTextHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { IndentedTextProps } from '../../../schema';
import { KolIndentedText } from '../component';

executeTests<IndentedTextProps>(
	'Heading',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolIndentedText],
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
