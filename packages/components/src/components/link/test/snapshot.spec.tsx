import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { Props } from '../../link/types';
import { COMPONENTS } from '../../component-list';
import { getLinkHtml } from './html.mock';

executeTests<Props>(
	'Link',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link {...props} />,
		});
		return page;
	},
	{
		_href: ['https://google.de'],
		_icon: ['codicon codicon-home'],
		_hideLabel: [false, true],
		_label: ['Label'],
		_target: ['_self', '_blank', 'egal'],
		_targetDescription: ['Der Link wird in einem neuen Tab geöffnet.'],
		_tooltipAlign: ['top', 'right', 'bottom', 'left'],
	},
	getLinkHtml,
	{
		execMode: 'default', // ready
	}
);
