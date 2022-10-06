import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getVersionHtml } from './html.mock';

executeTests<Props>(
	'Version',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-version {...props} />,
		});
		return page;
	},
	{
		_version: ['1.0.0'],
	},
	getVersionHtml
);
