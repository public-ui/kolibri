import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
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
		_label: ['Slash', 'Backslash'],
		_symbol: ['/', '\\'],
	},
	getSymbolHtml,
	{
		execMode: 'default', // ready
	},
);
