import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { LinkProps } from '../../link/types';
import { getLinkHtml } from './html.mock';
import { KolLinkTag } from '../../../core/component-names';

executeTests<LinkProps>(
	'Link',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolLinkTag {...props} />,
		});
		return page;
	},
	{
		_href: ['https://google.de'],
		_icons: ['codicon codicon-home'],
		_hideLabel: [false, true],
		_label: ['Label'],
		_target: ['_self', '_blank', 'egal'],
		_tooltipAlign: ['top', 'right', 'bottom', 'left'],
		_download: ['', 'download-file.zip'],
	},
	getLinkHtml,
	{
		execMode: 'default', // ready
	},
);
