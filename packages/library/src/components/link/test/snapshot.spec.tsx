import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { LinkProps } from '../../../types/button-link';
import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getLinkHtml } from './html.mock';

executeTests<LinkProps>(
	'Link',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link {...props} />,
		});
		return page;
	},
	{
		_ariaExpanded: [false, true],
		_ariaLabel: ['Aria-Label'],
		_href: ['https://google.de'],
		_icon: ['fa-solid fa-house'],
		_iconOnly: [false, true],
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
