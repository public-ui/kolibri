import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { Props } from '../types';
import { getButtonGroupHtml } from './html.mock';
import { KolButtonGroupTag } from '../../../core/component-names';

executeTests<Props>(
	'ButtonGroup',
	async (props): Promise<SpecPage> => {
		return await newSpecPage({
			components: COMPONENTS,
			template: () => <KolButtonGroupTag {...props} />,
		});
	},
	{},
	getButtonGroupHtml,
	{
		execMode: 'default',
	},
);
