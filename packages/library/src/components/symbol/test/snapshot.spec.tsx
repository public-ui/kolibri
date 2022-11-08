import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getSymbolHtml } from './html.mock';

executeTests<Props>(
	'Symbol',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-symbol {...props} />,
		});
		return page;
	},
	{
		_ariaLabel: ['Slash', 'Backslash'],
		_symbol: ['/', '\\'],
	},
	getSymbolHtml,
	{
		execMode: 'default', // ready
	}
);
