import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getButtonHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { ButtonProps } from '../../../schema';
import { KolButton } from '../shadow';
import { KolButtonWc } from '../component';

executeTests<ButtonProps>(
	'Button',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolButton, KolButtonWc],
			template: () => <kol-button {...props} />,
		});
		return page;
	},
	{
		_disabled: [true, false],
		_label: ['Label'],
		_variant: ['primary', 'secondary', 'normal', 'danger', 'ghost'],
	},
	getButtonHtml,
);
