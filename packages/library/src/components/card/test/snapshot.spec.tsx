import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { executeTests } from 'stencil-awesome-test';

import { COMPONENTS } from '../../component-list';
import { Props } from '../component';
import { getCardHtml } from './html.mock';

executeTests<Props>(
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
		execMode: 'skip',
	}
);
