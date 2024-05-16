import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getSplitButtonHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { SplitButtonProps } from '../../../schema';
import { KolSplitButton } from '../shadow';

executeTests<SplitButtonProps>(
	'SplitButton',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolSplitButton],
			template: () => <kol-split-button {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_hideLabel: [true, false],
		_icons: ['codicon codicon-git-pull-request'],
		_disabled: [true, false],
		_name: ['Name', ''],
		_variant: ['primary', 'secondary', 'normal', 'danger', 'ghost'],
	},
	getSplitButtonHtml,
	{
		execMode: 'default', // ready
	},
);
