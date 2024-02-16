import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getSymbolHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { SymbolProps } from '@public-ui/schema';

executeTests<SymbolProps>(
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
