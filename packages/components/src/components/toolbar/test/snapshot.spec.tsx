import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getToolbarHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { ToolbarProps } from '../../../schema';
import { KolToolbar } from '../shadow';

executeTests<ToolbarProps>(
	'Toolbar',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolToolbar],
			template: () => <kol-toolbar {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_items: [
			[
				{
					_label: 'Button',
				},
				{
					_href: '#',
					_label: 'Link',
				},
			],
		],
	},
	getToolbarHtml,
);
