import { mixMembers } from 'stencil-awesome-test';

import { showExpertSlot } from '../../../utils/reuse';
import { getIconHtml } from '../../icon/test/html.mock';
import { LinkProps, States } from '../types';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';

export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	const state = mixMembers<LinkProps, States>(
		{
			_href: '…', // ⚠ required
			_hideLabel: false,
			_icons: {},
			_tooltipAlign: 'right',
			_targetDescription: 'Der Link wird in einem neuen Tab geöffnet.',
		},
		props
	);
	const hasExpertSlot = showExpertSlot(state._label);
	return `
<kol-link>
  <mock:shadow-root>
  <kol-link-wc>
<a${state._hideLabel === true && !hasExpertSlot && typeof state._label === 'string' ? ` aria-label="${state._label}"` : ''} class="${
		state._hideLabel === true ? ' hide-label' : ''
	}${typeof state._target === 'string' && state._target !== '_self' ? ' external-link' : ''}" href="${
		typeof state._href === 'string' && state._href.length > 0 ? state._href : 'javascript:void(0)'
	}"${typeof state._target === 'string' ? `${state._target === '_self' ? '' : 'rel="noopener"'} target="${state._target}"` : ''}${
		typeof state._download === 'string' ? ` download="${state._download}"` : ''
	}>
			${getSpanWcHtml(
				{
					...state,
					_label: state._label || state._href,
				},
				{
					expert: `<slot name="expert" slot="expert"></slot>`,
				},
				{
					additionalAttrs: '',
				}
			)}
			${
				typeof state._target === 'string' && state._target !== '_self'
					? getIconHtml(
							{
								_label: 'Der Link wird in einem neuen Tab geöffnet.',
								_icons: 'codicon codicon-link-external',
							},
							' class="external-link-icon"'
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
