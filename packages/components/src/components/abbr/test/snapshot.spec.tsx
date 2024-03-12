import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getAbbrHtml } from './html.mock';

import type { AbbrProps } from '@public-ui/schema';
import type { SpecPage } from '@stencil/core/testing';

executeTests<AbbrProps>(
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
