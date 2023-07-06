import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { KoliBriVersionProps } from '../types';
import { getVersionHtml } from './html.mock';

executeTests<KoliBriVersionProps>(
	'Version',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-version {...props} />,
		});
		return page;
	},
	{
		_label: ['1.0.0'],
	},
	getVersionHtml,
	{
		execMode: 'default', // ready
	}
);
