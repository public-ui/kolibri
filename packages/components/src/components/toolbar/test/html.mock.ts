import type { ToolbarItemPropType, ToolbarProps, ToolbarStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { showExpertSlot } from '../../../schema';
import { KolButtonTag, KolLinkTag } from '../../../core/component-names';

export const getToolbarHtml = (props: ToolbarProps): string => {
	const state = mixMembers<ToolbarProps, ToolbarStates>(
		{
			_label: '', // ⚠ required
			_items: [],
		},
		props,
	);

	return `
<kol-toolbar class="kol-toolbar">
  <mock:shadow-root>
  	<div aria-label="${showExpertSlot(state._label) ? '' : state._label}" class="toolbar" role="toolbar">
		${state._items
			.map((item: ToolbarItemPropType, index: number) => {
				if ('_href' in item) {
					return `
					<${KolLinkTag}
						class="kol-toolbar-item"
						_tabindex=${index === 0 ? 0 : -1}
						_label="${item._label}"
						_href="${item._href}"
					>
					</${KolLinkTag}>
				`;
				}
				return `
				<${KolButtonTag}
					class="kol-toolbar-item"
					_tabindex=${index === 0 ? 0 : -1}
					_label="${item._label}"
				>
				</${KolButtonTag}>
			`;
			})
			.join('')}
	</div>
  </mock:shadow-root>
</kol-toolbar>`;
};
