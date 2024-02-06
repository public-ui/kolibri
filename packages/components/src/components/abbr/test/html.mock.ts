import { mixMembers } from 'stencil-awesome-test';

import { nonce } from '../../../utils/dev.utils';
import { getTooltipHtml } from '../../tooltip/test/html.mock';
import { Props, States } from '../types';

export const getAbbrHtml = (props: Props): string => {
	const id = nonce();
	const state = mixMembers<Props, States>(
		{
			_label: '…', // ⚠ required
			_tooltipAlign: 'top',
		},
		props
	);
	return `
<kol-abbr>
  <mock:shadow-root>
    <abbr aria-describedby="${id}-tooltip" aria-label="${state._label}" role="definition" tabindex="0" ${
		typeof state._label === 'string' ? ` title="${state._label}"` : ''
	}>
      <span>
        <slot />
      </span>
    </abbr>
    ${getTooltipHtml({
			_align: state._tooltipAlign,
			_id: id,
			_label: state._label,
		})}
  </mock:shadow-root>
</kol-abbr>`;
};
