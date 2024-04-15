import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getLinkGroupHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { LinkGroupProps } from '@public-ui/schema';
import { KolLinkGroup } from '../component';

executeTests<LinkGroupProps>(
	'LinkGroup',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolLinkGroup],
			template: () => <kol-link-group {...props} />,
		});
		return page;
	},
	{
		_label: ['Primary', 'Danger'],
		_links: [
			{ _label: 'Link 1', _href: '#' },
			{ _label: 'Link 2', _href: '#' },
			{ _label: 'Link 3', _href: '#' },
		],
		_orientation: ['vertical', 'horizontal'],
	},
	(props) => getLinkGroupHtml(props),
	{
		execMode: 'default', // ready
	},
);
