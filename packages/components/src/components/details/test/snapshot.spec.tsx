import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getDetailsHtml } from './html.mock';
import { KolDetailsTag } from '../../../core/component-names';

executeTests<Props>(
	'Details',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolDetailsTag {...props} />,
		});
		return page;
	},
	{
		_label: ['Zusammenfassung'],
		_open: [false, true],
	},
	getDetailsHtml,
	{
		execMode: 'default', // ready
	},
);
