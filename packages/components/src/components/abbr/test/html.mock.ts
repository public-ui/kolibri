import { mixMembers } from 'stencil-awesome-test';
import { getTooltipHtml } from '../../tooltip/test/html.mock';
import { Props } from '../component';

export const getAbbrHtml = (props: Props): string => {
	props = mixMembers(
		{
			_title: '…', // ⚠ required
			_tooltipAlign: 'top',
		},
		props
	);
	return `
<kol-abbr>
  <mock:shadow-root>
    <abbr aria-labelledby="nonce" role="definition" ${typeof props._title === 'string' ? ` title="${props._title}"` : ''}>
      <span>
        <slot />
      </span>
    </abbr>
    ${getTooltipHtml({
			_align: props._tooltipAlign,
			_id: 'nonce',
			_label: props._title,
		})}
  </mock:shadow-root>
</kol-abbr>`;
};
