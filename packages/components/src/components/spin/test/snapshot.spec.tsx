import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';
import { getSpinHtml } from './html.mock';

import type { SpinProps } from '@public-ui/schema';
import type { SpecPage } from '@stencil/core/testing';

executeTests<SpinProps>(
	'Spin',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: COMPONENTS,
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
