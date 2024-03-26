import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getCardHtml } from './html.mock';
import { KolCardTag } from '../../../core/component-names';

executeTests<Props>(
	'Card',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolCardTag {...props} />,
		});
		return page;
	},
	{
		_hasCloser: [false, true],
		_hasFooter: [false, true],
		_label: ['Überschrift'],
		_level: [1, 2, 3, 4, 5, 6],
	},
	getCardHtml,
	{
		execMode: 'default', // ready
	},
);
