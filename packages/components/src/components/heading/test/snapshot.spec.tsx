import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getHeadingHtml } from './html.mock';

executeTests<Props>(
	'Heading',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-heading {...props} />,
		});
		return page;
	},
	{
		_label: ['Headline'],
		_level: [1, 2, 3, 4, 5, 6],
		// _overline: ['Overline'],
	},
	getHeadingHtml,
	{
		execMode: 'default', // ready
	}
);
