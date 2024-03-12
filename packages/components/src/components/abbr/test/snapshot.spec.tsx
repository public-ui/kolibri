import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getAbbrHtml } from './html.mock';

executeTests<Props>(
	'Abbr',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-abbr {...props} />,
		});
		return page;
	},
	{
		_label: ['Text'],
		_tooltipAlign: ['left', 'bottom', 'right', 'top'],
	},
	getAbbrHtml,
	{
		execMode: 'default', // ready
	},
);
