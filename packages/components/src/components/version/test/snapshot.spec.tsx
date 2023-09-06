import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getVersionHtml } from './html.mock';

const lables = new Map<string | undefined, string>();
lables.set(undefined, '<p>v0.0.0-alpha.0</p>');
lables.set('1.0.0', '<p>v1.0.0</p>');

executeTests<Props>(
	'Version',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-version {...props} />,
		});
		return page;
	},
	{
		_label: Array.from(lables.keys()),
	},
	(props) => getVersionHtml(props, { parsedLabel: lables.get(props._label) }),
	{
		execMode: 'default', // ready
	}
);
