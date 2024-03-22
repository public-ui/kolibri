import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getHeadingHtml } from './html.mock';

import type { HeadingProps } from '@public-ui/schema';
import type { SpecPage } from '@stencil/core/testing';

executeTests<HeadingProps>(
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
		_variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong'],
		// _secondaryHeadline: ['Secondary Headline'],
	},
	getHeadingHtml,
	{
		execMode: 'default', // ready
	},
);
