import { mixMembers } from 'stencil-awesome-test';

import { getTooltipHtml } from '../../tooltip/test/html.mock';
import { Props } from '../types';

export const getAbbrHtml = (props: Props): string => {
	props = mixMembers(
		{
			_label: '…', // ⚠ required
			_tooltipAlign: 'top',
		},
		props
	);
	return `
<kol-abbr  class="kol-abbr">
  <mock:shadow-root>
    <abbr aria-labelledby="nonce" role="definition" tabindex="0" ${typeof props._label === 'string' ? ` title="${props._label}"` : ''}>
      <span>
        <slot />
      </span>
    </abbr>
    ${getTooltipHtml({
			_align: props._tooltipAlign,
			_id: 'nonce',
			_label: props._label!, // TODO v2: Remove non-null assertion after label was converted to required prop
		})}
  </mock:shadow-root>
</kol-abbr>`;
};
