import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getLinkButtonHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { LinkButtonProps } from '@public-ui/schema';
import { KolLinkButton } from '../component';

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
		_label: ['Primary', 'Danger'],
		_href: ['#'],
		_icons: ['codicon codicon-squirrel'],
	},
	(props) => getLinkButtonHtml(props),
	{
		execMode: 'default', // ready
	},
);
