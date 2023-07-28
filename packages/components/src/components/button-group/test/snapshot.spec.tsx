import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../component';
import { getButtonGroupHtml } from './html.mock';

executeTests<Props>(
	'Card',
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
	}
);
