import { mixMembers } from 'stencil-awesome-test';
import { LinkProps, LinkStates } from '../../../types/button-link';
import { getIconHtml } from '../../icon/test/html.mock';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';

export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	const state = mixMembers<LinkProps, LinkStates>(
		{
			_href: 'javascript:void(0);', // ⚠ required
			_hideLabel: false,
			_icon: {},
			_label: props._href || '…',
			_tooltipAlign: 'right',
			_targetDescription: 'Der Link wird in einem neuen Tab geöffnet.',
		},
		props
	);
	if (!state._label) state._label = state._href;
	return `
<kol-link>
  <mock:shadow-root>
  <kol-link-wc>
    <a${typeof state._ariaExpanded === 'boolean' ? ` aria-expanded="${state._ariaExpanded ? 'true' : 'false'}"` : ''}${
		state._hideLabel === true || state._useCase === 'image' ? ` aria-labelledby="nonce"` : ''
	} class="${state._hideLabel === true ? ' icon-only hide-label' : ''}${
		typeof state._target === 'string' && state._target !== '_self' ? ' external-link' : ''
	}" href="${typeof state._href === 'string' && state._href.length > 0 ? state._href : 'javascript:void(0)'}"${
		typeof state._selector === 'string' ? ' role="link" tabindex="0"' : ''
	}${typeof state._target === 'string' ? `${state._target === '_self' ? '' : 'rel="noopener"'} target="${state._target}"` : ''}>
			${getSpanWcHtml(
				{
					...state,
				},
				{
					expert: `<slot name="expert" slot="expert"></slot><slot slot="expert"></slot>`,
				},
				''
			)}
			${
				typeof state._target === 'string' && state._target !== '_self'
					? getIconHtml(
							{
								_label: 'Der Link wird in einem neuen Tab geöffnet.',
								_icon: 'codicon codicon-link-external',
							},
							' class="external-link-icon"'
					  )
					: ''
			}
    </a>
		${getTooltipHtml(
			{
				_align: state._tooltipAlign,
				_id: 'nonce',
				_label: state._label,
			},
			` aria-hidden="true"${state._hideLabel !== true ? ' hidden' : ''}`
		)}
    </kol-link-wc>
  </mock:shadow-root>
  ${innerHTML}
</kol-link>`;
};
