import { mixMembers } from 'stencil-awesome-test';

import { translate } from '../../../i18n';
import { nonce } from '../../../utils/dev.utils';
import { showExpertSlot } from '../../../utils/reuse';
import { getIconHtml } from '../../icon/test/html.mock';
import { LinkProps, States } from '../../link/types';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';

export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	const state = mixMembers<LinkProps, States>(
		{
			_href: '', // ⚠ required
			_id: nonce(), // ⚠ required
			_icons: {}, // ⚠ required
		},
		props
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const isExternal = typeof state._target === 'string' && state._target !== '_self';
	return `
<kol-link>
  <mock:shadow-root>
  <kol-link-wc>
<a${
		state._hideLabel === true && !hasExpertSlot && typeof state._label === 'string'
			? ` aria-label="${state._label}${isExternal ? ' (kol-open-link-in-tab)' : ''}"`
			: ''
	}
	${!hasExpertSlot && state._hideLabel ? ` aria-describedby="${state._id}-tooltip"` : ''}
	class="${state._hideLabel === true ? ' icon-only hide-label' : ''}${
		typeof state._target === 'string' && state._target !== '_self' ? ' external-link' : ''
	}" href="${typeof state._href === 'string' && state._href.length > 0 ? state._href : 'javascript:void(0);'}"
	id="${state._id}"
	${typeof state._selector === 'string' ? ' role="link" tabindex="0"' : ''}
	${
		typeof state._target === 'string'
			? `${state._target === '_self' ? '' : 'rel="noopener"'}
	target="${state._target}"`
			: ''
	}${typeof state._download === 'string' ? ` download="${state._download}"` : ''}>
			${getSpanWcHtml(
				{
					...state,
					_label: state._label || state._href,
				},
				{
					expert: `<slot name="expert" slot="expert"></slot><slot slot="expert"></slot>`,
				}
			)}
			${
				typeof state._target === 'string' && state._target !== '_self'
					? getIconHtml(
							{
								_label: state._hideLabel ? '' : translate('kol-open-link-in-tab'),
								_icons: 'codicon codicon-link-external',
							},
							` class="external-link-icon"${state._hideLabel ? ' aria-hidden=""' : ''}`
					  )
					: ''
			}
    </a>
		${getTooltipHtml(
			{
				_align: state._tooltipAlign,
				_id: state._id,
				_label: state._label || state._href,
			},
			`${hasExpertSlot || !state._hideLabel ? ' hidden' : ''}`
		)}
    </kol-link-wc>
  </mock:shadow-root>
  ${innerHTML}
</kol-link>`;
};
