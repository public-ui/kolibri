import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getSkipNavHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { SkipNavProps } from '../../../schema';
import { KolSkipNav } from '../component';

executeTests<SkipNavProps>(
	'SkipNav',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolSkipNav],
			template: () => <kol-skip-nav {...props} />,
		});
		return page;
	},
	{
		_label: ['Label', ''],
		_links: [
			[
				{
					_label: 'Zum Anfang',
				},
				{
					_label: 'Zum Formular',
				},
				{
					_label: 'Zum Ende',
				},
			],
		],
	},
	getSkipNavHtml,
	{
		execMode: 'default', // ready
	},
);
