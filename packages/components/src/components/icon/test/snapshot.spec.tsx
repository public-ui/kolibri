import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getIconHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { IconProps } from '../../../schema';
import { KolIcon } from '../component';

executeTests<IconProps>(
	'Icon',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolIcon],
			template: () => <kol-icon {...props} />,
		});
		return page;
	},
	{
		_label: ['Aria-Label'],
		_icons: ['codicon codicon-home'],
	},
	getIconHtml,
	{
		execMode: 'default', // ready
	},
);
