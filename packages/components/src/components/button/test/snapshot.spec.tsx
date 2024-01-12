import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getButtonHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { ButtonProps } from '@public-ui/schema';

executeTests<ButtonProps>(
	'Button',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-button {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
	},
	getButtonHtml
);
