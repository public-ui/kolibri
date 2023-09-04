import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getMarkdownRendererWcHtml } from './html.mock';

const samples = new Map<string, string>();
samples.set('**Fetter Text**', '<p><strong>Fetter Text</strong></p>');
samples.set('_Unterstrichen_', '<p><em>Unterstrichen</em></p>');
samples.set('[Github](https://github.com/public-ui/kolibri/issues/5025)', '<p><a href="https://github.com/public-ui/kolibri/issues/5025">Github</a></p>');

executeTests<Props>(
	'MarkdownRendererWc',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-markdown-renderer-wc {...props} />,
		});
		return page;
	},
	{
		_label: Array.from(samples.keys()),
	},
	(props) => getMarkdownRendererWcHtml(samples.get(props._label)!),
	{
		execMode: 'default', // ready
	}
);
