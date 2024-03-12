import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getLinkHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { LinkProps } from '@public-ui/schema';

executeTests<LinkProps>(
	'Link',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link {...props} />,
		});
		return page;
	},
	{
		_disabled: [true, false],
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
