import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getVersionHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { VersionProps } from '@public-ui/schema';

executeTests<VersionProps>(
	'Version',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-version {...props} />,
		});
		return page;
	},
	{
		_label: ['1.0.0'],
	},
	(props) => getVersionHtml(props),
	{
		execMode: 'default', // ready
	},
);
