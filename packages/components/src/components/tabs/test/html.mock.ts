import type { TabButtonProps, TabsProps, TabsStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { KolButtonWcTag } from '../../../core/component-names';

export const getTabsHtml = (props: TabsProps): string => {
	const state = mixMembers<TabsProps, TabsStates>(
		{
			_align: 'top',
			_label: '', // ⚠ required
			_selected: 0,
			_tabs: [],
		},
		props,
	);

	return `
<kol-tabs  _selected="${state._selected ? state._selected : '0'}" class="kol-tabs">
  <mock:shadow-root>
		<div class="tabs-align-top">
	    <div
	    aria-label="${state._label ? state._label : ''}"
	    class="tabs-button-group kol-button-group-wc"
	    role="tablist"
	    tabindex="-1"
	    >

	    ${state._tabs
				.map((button: TabButtonProps, index: number) => {
					return `
						<${KolButtonWcTag}
							_ariacontrols=${`tabpanel-${index}`}
							${state._selected === index ? '_ariaSelected=""' : ''}
							${state._selected === index ? '_customclass="selected"' : ''}
							${typeof button._icons === 'string' ? `_icons="${button._icons}"` : ''}
							_id="${state._label.replace(/\s/g, '-')}-tab-${index}"
							_label="${button._label}"
							_role="tab"
							_tabindex=${state._selected === index ? 0 : -1}
							_value="${index}"
							${state._selected === index ? '_variant="custom"' : ''}
							${button._disabled ? '_disabled=""' : ''}
							>
						</${KolButtonWcTag}>
				`;
				})
				.join('')}
				</div>
	    <div class="tabs-content"></div>
		</div>
  </mock:shadow-root>
</kol-tabs>`;
};
