import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import type { TreeApi } from './api';

const treeBem = bem.forBlock('kol-tree');
const BEM_CLASS_TREE = treeBem();
const BEM_CLASS_TREE__TREEVIEW_NAVIGATION = treeBem('treeview-navigation');

/**
 * Renders the tree landmark with the `role="tree"` list the slotted `kol-tree-item` elements belong to.
 *
 * The `<nav>` carries the block class itself (as `BreadcrumbFC` does): base and theme styles
 * address it directly, e.g. with `.kol-tree:focus-within`.
 */
export const TreeFC: FC<FunctionalComponentProps<TreeApi>> = ({ handleSlotchange, label }) => (
	<nav class={BEM_CLASS_TREE} aria-label={label}>
		<ul class={BEM_CLASS_TREE__TREEVIEW_NAVIGATION} role="tree" aria-label={label}>
			<slot onSlotchange={handleSlotchange} />
		</ul>
	</nav>
);
