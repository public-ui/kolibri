import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { KolibriSpanProps } from '../types';
import { getSpanHtml, getSpanWcHtml } from './html.mock';

executeTests<KolibriSpanProps>(
	'SpanWc',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-span-wc {...props} />,
		});
		return page;
	},
	{
		_icon: ['codicon codicon-home'],
		_hideLabel: [true, false],
		_label: ['Text', false, ''],
	},
	getSpanWcHtml,
	{
		execMode: 'default', // ready
	}
);

executeTests<KolibriSpanProps>(
	'Span',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-span {...props} />,
		});
		return page;
	},
	{
		_icon: ['codicon codicon-home'],
		_hideLabel: [true, false],
		_label: ['Text', false, ''],
	},
	getSpanHtml,
	{
		execMode: 'default', // ready
	}
);
