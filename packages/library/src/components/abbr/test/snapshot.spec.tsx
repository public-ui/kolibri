import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
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
		_title: ['Text'],
		_tooltipAlign: ['left', 'bottom', 'right', 'top'],
	},
	getAbbrHtml,
	{
		execMode: 'skip',
	}
);
