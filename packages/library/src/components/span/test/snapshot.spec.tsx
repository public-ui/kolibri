import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { Props } from '../component';
import { getSpanWcHtml } from './html.mock';

executeTests<Props>(
	'SpanWc',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-span-wc {...props} />,
		});
		return page;
	},
	{
		_label: ['Text'],
		_icon: [],
		_iconOnly: [true, false],
	},
	getSpanWcHtml,
	{
		execMode: 'default',
	}
);

executeTests<Props>(
	'Span',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-span {...props} />,
		});
		return page;
	},
	{
		_label: ['Text'],
		_icon: [],
		_iconOnly: [true, false],
	},
	getSpanWcHtml,
	{
		execMode: 'skip',
	}
);
