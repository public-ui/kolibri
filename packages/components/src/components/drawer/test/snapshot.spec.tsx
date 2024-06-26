import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getDrawerHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { DrawerProps } from '../../../schema';
import { KolDrawer } from '../shadow';

executeTests<DrawerProps>(
	'Toolbar',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolDrawer],
			template: () => <kol-drawer {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_open: [true, false],
	},
	getDrawerHtml,
);
