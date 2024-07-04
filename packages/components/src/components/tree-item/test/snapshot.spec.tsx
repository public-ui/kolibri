import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getTreeItemHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { TreeItemProps } from '../../../schema';
import { KolTreeItem } from '../shadow';
import { KolTreeItemWc } from '../component';

executeTests<TreeItemProps>(
	'TreeItem',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolTreeItem, KolTreeItemWc],
			template: () => <kol-tree-item {...props} />,
		});
		return page;
	},
	{
		_label: ['Label'],
		_href: ['https://google.de'],
		_open: [true, false],
		_active: [true, false],
	},
	getTreeItemHtml,
);
