import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getHeadingHtml } from './html.mock';
import { KolHeadingTag } from '../../../core/component-names';

executeTests<Props>(
	'Heading',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolHeadingTag {...props} />,
		});
		return page;
	},
	{
		_label: ['Headline'],
		_level: [1, 2, 3, 4, 5, 6],
		// _secondaryHeadline: ['Secondary Headline'],
	},
	getHeadingHtml,
	{
		execMode: 'default', // ready
	},
);
