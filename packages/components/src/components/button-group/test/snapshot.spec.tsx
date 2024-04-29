import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getButtonGroupHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { ButtonGroupProps } from '../../../schema';
import { KolButtonGroup } from '../shadow';
import { KolButtonGroupWc } from '../component';

executeTests<ButtonGroupProps>(
	'ButtonGroup',
	async (props): Promise<SpecPage> => {
		return await newSpecPage({
			components: [KolButtonGroup, KolButtonGroupWc],
			template: () => <kol-button-group {...props} />,
		});
	},
	{},
	getButtonGroupHtml,
	{
		execMode: 'default',
	},
);
