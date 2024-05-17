import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getSpinHtml } from './html.mock';

import type { SpinProps } from '../../../schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolSpin } from '../shadow';

executeTests<SpinProps>(
	'Spin',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolSpin],
			template: () => <kol-spin {...props} />,
		});
		return page;
	},
	{
		_show: [false, true],
	},
	getSpinHtml,
	{
		execMode: 'default', // ready
	},
);
