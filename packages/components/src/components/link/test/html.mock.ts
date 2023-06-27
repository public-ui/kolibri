import { mixMembers } from 'stencil-awesome-test';
import { LinkProps } from '../../../types/button-link';
import { isEmptyOrPrefixOf } from '../../../utils/validator';
import { getIconHtml } from '../../icon/test/html.mock';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';

export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	props = mixMembers(
		{
			_href: 'javascript:void(0)',
			_hideLabel: false,
			_label: '',
			// _label: '…', // ⚠ required
			_tooltipAlign: 'right',
			_targetDescription: 'Der Link wird in einem neuen Tab geöffnet.',
		},
		props
	);
	if (typeof props._ariaLabel === 'string' && isEmptyOrPrefixOf(props._label, props._ariaLabel) === false) {
		if (props._label.length > 0) {
			props._ariaLabel = props._label;
		} else {
			props._label = props._ariaLabel;
		}
	}
	return `
<kol-link>
  <mock:shadow-root>
  <kol-link-wc${props._hideLabel ? ' class="hide-label"' : ''}>
    <a${typeof props._ariaExpanded === 'boolean' ? ` aria-expanded="${props._ariaExpanded ? 'true' : 'false'}"` : ''}${
		props._hideLabel === true || props._useCase === 'image' ? ` aria-labelledby="nonce"` : ''
	} class="${props._hideLabel === true ? ' icon-only hide-label' : ''}${
		typeof props._target === 'string' && props._target !== '_self' ? ' external-link' : ''
	}" href="${typeof props._href === 'string' && props._href.length > 0 ? props._href : 'javascript:void(0)'}"${
		typeof props._selector === 'string' ? ' role="link" tabindex="0"' : ''
	}${typeof props._target === 'string' ? `${props._target === '_self' ? '' : 'rel="noopener"'} target="${props._target}"` : ''}>
			${getSpanWcHtml(
				{
					...props,
					_label: props._label,
				},
				{
					expert: `<slot name="expert" slot="expert"></slot><slot slot="expert"></slot>`,
				},
				''
			)}
			${
				typeof props._target === 'string' && props._target !== '_self'
					? getIconHtml(
							{
								_ariaLabel: 'Der Link wird in einem neuen Tab geöffnet.',
								_icon: 'codicon codicon-link-external',
							},
							' class="external-link-icon"'
					  )
					: ''
			}
    </a>
		${getTooltipHtml(
			{
				_align: props._tooltipAlign,
				_id: 'nonce',
				_label: props._ariaLabel || props._label,
			},
			` aria-hidden="true"${props._hideLabel !== true ? ' hidden' : ''}`
		)}
    </kol-link-wc>
  </mock:shadow-root>
  ${innerHTML}
</kol-link>`;
};
