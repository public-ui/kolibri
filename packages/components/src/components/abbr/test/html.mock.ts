import { mixMembers } from 'stencil-awesome-test';

import { getTooltipHtml } from '../../tooltip/test/html.mock';

import type { AbbrProps } from '@public-ui/schema';

export const getAbbrHtml = (props: AbbrProps): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
			_tooltipAlign: 'top',
		},
		props
	);
	return `
<kol-abbr>
  <mock:shadow-root>
    <abbr aria-labelledby="nonce" role="definition" tabindex="0" ${typeof props._label === 'string' ? ` title="${props._label}"` : ''}>
      <span>
        <slot />
      </span>
    </abbr>
    ${getTooltipHtml({
			_align: props._tooltipAlign,
			_id: 'nonce',
			_label: props._label,
		})}
  </mock:shadow-root>
</kol-abbr>`;
};
