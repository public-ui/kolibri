import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getTreeHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { TreeProps } from '../../../schema';
import { KolTree } from '../shadow';
import { KolTreeWc } from '../component';

executeTests<TreeProps>(
	'Tree',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolTree, KolTreeWc],
			template: () => <kol-tree {...props} />,
		});
		return page;
	},
	{
		_label: ['Label 1', `Label 2`],
	},
	getTreeHtml,
);
