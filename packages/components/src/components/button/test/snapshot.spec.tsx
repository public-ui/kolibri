import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getButtonHtml } from './html.mock';
import { KolButtonTag } from '../../../core/component-names';

executeTests<Props>(
	'Button',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <KolButtonTag {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
	},
	getButtonHtml,
);
