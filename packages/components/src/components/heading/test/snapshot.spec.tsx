import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getHeadingHtml } from './html.mock';

import type { HeadingProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolHeading } from '../shadow';
import { KolHeadingWc } from '../component';

executeTests<HeadingProps>(
	'Heading',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolHeading, KolHeadingWc],
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
