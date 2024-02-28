import { mixMembers } from 'stencil-awesome-test';

import { showExpertSlot } from '../../../utils/reuse';
import { getIconHtml } from '../../icon/test/html.mock';
import { LinkProps, States } from '../../link/types';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';
import { translate } from '../../../i18n';

export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	const state = mixMembers<LinkProps, States>(
		{
			_href: '', // ⚠ required
			_icons: {}, // ⚠ required
		},
		props
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const isExternal = typeof state._target === 'string' && state._target !== '_self';
	return `
<kol-link class="kol-link">
  <mock:shadow-root>
  <kol-link-wc class="kol-link-wc">
<a${
		state._hideLabel === true && !hasExpertSlot && typeof state._label === 'string'
			? ` aria-label="${state._label}${isExternal ? ' (kol-open-link-in-tab)' : ''}"`
			: ''
	} class="${state._hideLabel === true ? ' icon-only hide-label' : ''}${
		typeof state._target === 'string' && state._target !== '_self' ? ' external-link' : ''
	}" href="${typeof state._href === 'string' && state._href.length > 0 ? state._href : 'javascript:void(0);'}"${
		typeof state._selector === 'string' ? ' role="link" tabindex="0"' : ''
	}${typeof state._target === 'string' ? `${state._target === '_self' ? '' : 'rel="noopener"'} target="${state._target}"` : ''}${
		typeof state._download === 'string' ? ` download="${state._download}"` : ''
	}>
			${getSpanWcHtml(
				{
					...state,
					_label: state._label || state._href,
				},
				{
					expert: `<slot name="expert" slot="expert"></slot><slot slot="expert"></slot>`,
				},
				{
					additionalClassNames: ['kol-span-wc'],
				}
			)}
			${
				typeof state._target === 'string' && state._target !== '_self'
					? getIconHtml(
							{
								_label: state._hideLabel ? '' : translate('kol-open-link-in-tab'),
								_icons: 'codicon codicon-link-external',
							},
							` class="kol-icon external-link-icon"${state._hideLabel ? ' aria-hidden=""' : ''}`
					  )
					: ''
			}
    </a>
		${getTooltipHtml(
			{
				_align: state._tooltipAlign,
				_label: state._label || state._href,
			},
			` aria-hidden="true"${hasExpertSlot || !state._hideLabel ? ' hidden' : ''}`
		)}
    </kol-link-wc>
  </mock:shadow-root>
  ${innerHTML}
</kol-link>`;
};
