import { mixMembers } from 'stencil-awesome-test';

import type { AbbrProps } from '../../../schema';
import { KolTooltipWcTag } from '../../../core/component-names';

export const getAbbrHtml = (props: AbbrProps): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
			_tooltipAlign: 'top',
		},
		props,
	);
	return `
<kol-abbr  class="kol-abbr">
  <mock:shadow-root>
    <abbr aria-labelledby="nonce" role="definition" tabindex="0" ${typeof props._label === 'string' ? ` title="${props._label}"` : ''}>
      <span>
        <slot />
      </span>
    </abbr>
		<${KolTooltipWcTag} _align=${props._tooltipAlign} _id="nonce" _label=${props._label}></${KolTooltipWcTag}>
  </mock:shadow-root>
</kol-abbr>`;
};
