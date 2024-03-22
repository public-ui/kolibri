import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getButtonGroupHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { ButtonGroupProps } from '@public-ui/schema';

executeTests<ButtonGroupProps>(
	'ButtonGroup',
	async (props): Promise<SpecPage> => {
		return await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-button-group {...props} />,
		});
	},
	{},
	getButtonGroupHtml,
	{
		execMode: 'default',
	},
);
