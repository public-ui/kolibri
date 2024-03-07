import { mixMembers } from 'stencil-awesome-test';

import { showExpertSlot } from '@public-ui/schema';

import { getIconHtml } from '../../icon/test/html.mock';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';

import type { LinkProps, LinkStates } from '@public-ui/schema';
import clsx from 'clsx';
import { translate } from '../../../i18n';
export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	const state = mixMembers<LinkProps, LinkStates>(
		{
			_ariaCurrentValue: 'page',
			_href: '', // ⚠ required
			_icons: {},
		},
		props
	);
	const hasExpertSlot = showExpertSlot(state._label);
	const isExternal = typeof state._target === 'string' && state._target !== '_self';

	const classNames = clsx({
		disabled: state._disabled,
		'hide-label': state._hideLabel,
		'external-link': isExternal,
	});

	return `
<kol-link class="kol-link">
  <mock:shadow-root>
  <kol-link-wc class="kol-link-wc">
		<a
			${state._hideLabel === true && typeof state._label === 'string' ? ` aria-label="${state._label}${isExternal ? ' (kol-open-link-in-tab)' : ''}"` : ''}
			class="${classNames}"
			href="${typeof state._href === 'string' && state._href.length > 0 ? state._href : 'javascript:void(0);'}"
			${
				typeof state._target === 'string'
					? `${state._target === '_self' ? '' : 'rel="noopener"'}
			target="${state._target}"`
					: ''
			}
			${typeof state._download === 'string' ? ` download="${state._download}"` : ''}
			${props._disabled ? `aria-disabled="true"` : ''}
			${props._disabled ? `tabindex="-1"` : ''}
		>
			${getSpanWcHtml(
				{
					...state,
					_label: state._label || state._href,
				},
				{
					expert: `<slot name="expert" slot="expert"></slot>`,
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
