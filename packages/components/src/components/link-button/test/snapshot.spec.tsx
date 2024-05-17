import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getLinkButtonHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { LinkButtonProps } from '../../../schema';
import { KolLinkButton } from '../shadow';

executeTests<LinkButtonProps>(
	'LinkButton',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolLinkButton],
			template: () => <kol-link-button {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_href: ['https://google.de'],
		_icons: ['codicon codicon-squirrel'],
		_disabled: [true, false],
		_hideLabel: [false, true],
		_target: ['_self', '_blank', 'egal'],
		_tooltipAlign: ['top', 'right', 'bottom', 'left'],
		_download: ['', 'download-file.zip'],
	},
	getLinkButtonHtml,
	{
		execMode: 'default', // ready
	},
);
