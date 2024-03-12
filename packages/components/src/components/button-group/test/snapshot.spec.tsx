import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getButtonGroupHtml } from './html.mock';

executeTests<Props>(
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
