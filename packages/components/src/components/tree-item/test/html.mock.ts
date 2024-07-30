import { mixMembers } from 'stencil-awesome-test';

import { KolLinkWcTag, KolTreeItemWcTag } from '../../../core/component-names';
import type { TreeItemProps, TreeItemStates } from '../../../schema';

export const getTreeItemHtml = (props: TreeItemProps): string => {
	const state = mixMembers<TreeItemProps, TreeItemStates>(
		{
			_active: false,
			_hasChildren: false,
			_href: '',
			_label: '',
			_open: false,
		},
		props,
	);

	return `
<kol-tree-item >
  <mock:shadow-root>

	<${KolTreeItemWcTag} class=" kol-tree-item kol-tree-item-wc">
	<li class="tree-item" style="--level: 0;">
	<${KolLinkWcTag}
		${state._hasChildren && state._open ? `_ariaexpanded=""` : ''}
		class="tree-link first-level ${state._active ? 'active' : ''}"
		_label=""
		_role="treeitem"
		_href="${state._href}"
		_tabIndex="${state._active ? 0 : -1}"
	>
		<span slot="expert">
			${
				state._hasChildren
					? state._open
						? `<span class="toggle-button" >
						-
					</span>`
						: `	<span class="toggle-button" >
						+
					</span>	`
					: ''
			}
			${state._label}
		</span>
	</${KolLinkWcTag}>
	<ul ${!state._hasChildren || !state._open ? 'hidden=""' : ''} id="tree-group-nonce" role="group">
		<slot />
	</ul>
</li>
</${KolTreeItemWcTag} >
		</mock:shadow-root>
</kol-tree-item>
`;
};
