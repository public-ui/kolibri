import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { executeTests } from 'stencil-awesome-test';
import { getButtonHtml } from './html.mock';
import { ButtonProps } from '../../../components';

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
