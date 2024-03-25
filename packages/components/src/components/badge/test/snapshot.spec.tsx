import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getBadgeHtml } from './html.mock';
import { KolBadgeTag } from '../../../core/component-names';

executeTests<Props>(
	'Badge',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolBadgeTag {...props} />,
		});
		return page;
	},
	{
		_color: ['#000000'],
		_icons: ['codicon codicon-home'],
		_label: ['Text', '**Te**xt'],
	},
	(props) => getBadgeHtml(props),
	{
		execMode: 'default', // ready
	},
);
