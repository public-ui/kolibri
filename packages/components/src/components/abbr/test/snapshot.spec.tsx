import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getAbbrHtml } from './html.mock';

import type { AbbrProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolAbbr } from '../component';

executeTests<AbbrProps>(
	'Abbr',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolAbbr],
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
