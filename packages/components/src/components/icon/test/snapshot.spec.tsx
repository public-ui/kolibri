import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getIconHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { IconProps } from '@public-ui/schema';

executeTests<IconProps>(
	'Icon',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
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
