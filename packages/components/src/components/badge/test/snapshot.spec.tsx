import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getBadgeHtml } from './html.mock';

const lables = new Map<string, string>();
lables.set('Text', '<p>Text</p>');
lables.set('**Te**xt', '<p><strong>Te</strong>xt</p>');

executeTests<Props>(
	'Badge',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-badge {...props} />,
		});
		return page;
	},
	{
		_color: ['#000000'],
		_icon: ['codicon codicon-home'],
		_label: Array.from(lables.keys()),
	},
	(props) => getBadgeHtml(props, { parsedLabel: lables.get(props._label) }),
	{
		execMode: 'default', // ready
	}
);
