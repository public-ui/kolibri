import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { LinkProps } from '../../../types/button-link';
import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getLinkHtml } from './html.mock';

executeTests<LinkProps>(
	'Link 1',
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
		// _fill: [false, true],
		_href: ['https://google.de'],
		_icon: ['fa-solid fa-house'],
		_iconOnly: [false, true],
		_stealth: [false, true],
		// _target: ['_self', '_blank', 'egal'],
		// _targetDescription: ['Der Link wird in einem neuen Tab geöffnet.'],
		// _tooltipAlign: ['top', 'right', 'bottom', 'left'],
		// _underline: [false, true],
		// _useCase: ['text', 'image', 'nav'],
	},
	getLinkHtml,
	{
		execMode: 'default', // ready
	}
);

executeTests<LinkProps>(
	'Link 2',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link {...props} />,
		});
		return page;
	},
	{
		// _ariaExpanded: [false, true],
		// _ariaLabel: ['Aria-Label'],
		// _fill: [false, true],
		// _href: ['https://google.de'],
		// _icon: ['home'],
		// _iconAlign: ['left', 'right'],
		// _iconOnly: [false, true],
		// _stealth: [false, true],
		_target: ['_self', '_blank', 'egal'],
		_targetDescription: ['Der Link wird in einem neuen Tab geöffnet.'],
		_tooltipAlign: ['top', 'right', 'bottom', 'left'],
		_underline: [false, true],
		_useCase: ['text', 'image', 'nav'],
	},
	getLinkHtml,
	{
		execMode: 'default', // ready
	}
);
