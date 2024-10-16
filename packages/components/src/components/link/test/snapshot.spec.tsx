import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getLinkHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { LinkProps } from '../../../schema';
import { KolLink } from '../shadow';
import { KolLinkWc } from '../component';

executeTests<LinkProps>(
	'Link',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolLink, KolLinkWc],
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
