import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getSpanHtml, getSpanWcHtml } from './html.mock';
import { KolibriSpanProps } from '../types';

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
		_label: ['Text'],
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
		_label: ['Text'],
	},
	getSpanHtml,
	{
		execMode: 'default', // ready
	}
);
