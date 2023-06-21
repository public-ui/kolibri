import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getSymbolHtml } from './html.mock';
import { KoliBriSymbolProps } from '../types';

executeTests<KoliBriSymbolProps>(
	'Symbol',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-symbol {...props} />,
		});
		return page;
	},
	{
		_label: ['Slash', 'Backslash'],
		_symbol: ['/', '\\'],
	},
	getSymbolHtml,
	{
		execMode: 'default', // ready
	}
);
