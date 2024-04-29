import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getSymbolHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { SymbolProps } from '../../../schema';
import { KolSymbol } from '../component';

executeTests<SymbolProps>(
	'Symbol',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolSymbol],
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
	},
);
