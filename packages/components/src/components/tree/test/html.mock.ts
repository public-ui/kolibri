import { mixMembers } from 'stencil-awesome-test';

import { KolTreeWcTag } from '../../../core/component-names';
import type { TreeProps, TreeStates } from '../../../schema';

export const getTreeHtml = (props: TreeProps): string => {
	const state = mixMembers<TreeProps, TreeStates>(
		{
			_label: '', // ⚠ required
		},
		props,
	);

	return `
<kol-tree class="kol-tree">
  <mock:shadow-root>

	<${KolTreeWcTag}  class="kol-tree-wc">
	<nav class="tree" aria-label='${state._label}'>
	<ul class="treeview-navigation" role="tree" aria-label='${state._label}'>
		<slot />
	</ul>
</nav>
</${KolTreeWcTag} >
		</mock:shadow-root>
</kol-tree>
`;
};
