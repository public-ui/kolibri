import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getSpanHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { SpanProps } from '../../../schema';
import { KolSpan } from '../shadow';
import { KolSpanWc } from '../component';

executeTests<SpanProps>(
	'Span',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolSpan, KolSpanWc],
			template: () => <kol-span {...props} />,
		});
		return page;
	},
	{
		_icons: ['codicon codicon-home'],
		_hideLabel: [true, false],
		_label: ['Text', ''],
	},
	getSpanHtml,
	{
		execMode: 'default', // ready
	},
);
