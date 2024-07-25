import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { SpecPage } from '@stencil/core/testing';
import type { SpanProps } from '../../../schema';
import { KolSpanWc } from '../component';
import { getSpanWcHtml } from './html.mock';

executeTests<SpanProps>(
	'Span',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolSpanWc],
			template: () => <kol-span-wc {...props} />,
		});
		return page;
	},
	{
		_icons: ['codicon codicon-home'],
		_hideLabel: [true, false],
		_label: ['Text', ''],
	},
	getSpanWcHtml,
	{
		execMode: 'default', // ready
	},
);
