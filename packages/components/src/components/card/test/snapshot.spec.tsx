import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { koliBriCardProps } from '../types';
import { getCardHtml } from './html.mock';

executeTests<koliBriCardProps>(
	'Card',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-card {...props} />,
		});
		return page;
	},
	{
		_heading: ['Überschrift'],
		_level: [1, 2, 3, 4, 5, 6],
		_hasFooter: [false, true],
	},
	getCardHtml,
	{
		execMode: 'default', // ready
	}
);
