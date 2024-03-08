import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';

import type { SpecPage } from '@stencil/core/testing';
import { getButtonHtml } from './html.mock';

executeTests<NonNullable<unknown>>(
	'Button',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <demo-button {...props} />,
		});
		return page;
	},
	{
		_label: [],
	},
	getButtonHtml,
);
