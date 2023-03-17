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
			_iconOnly: false,
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
<kol-link${props._ariaExpanded ? ' _aria-expanded' : ''}${props._iconOnly ? ' _icon-only' : ''}>
  <mock:shadow-root>
  <kol-link-wc${props._ariaExpanded ? ' _aria-expanded' : ''}${props._iconOnly ? ' _icon-only' : ''}>
    <a${typeof props._ariaExpanded === 'boolean' ? ` aria-expanded="${props._ariaExpanded ? 'true' : 'false'}"` : ''}${
		props._iconOnly === true || props._useCase === 'image' ? ` aria-labelledby="nonce"` : ''
	} class="${props._iconOnly === true ? ' icon-only' : ''}${typeof props._target === 'string' && props._target !== '_self' ? ' external-link' : ''}" href="${
		typeof props._href === 'string' && props._href.length > 0 ? props._href : 'javascript:void(0)'
	}"${typeof props._selector === 'string' ? ' role="link" tabindex="0"' : ''}${
		typeof props._target === 'string' ? `${props._target === '_self' ? '' : 'rel="noopener"'} target="${props._target}"` : ''
	}>
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
		${
			props._iconOnly === true || props._useCase === 'image'
				? getTooltipHtml(
						{
							_align: props._tooltipAlign,
							_id: 'nonce',
							_label: props._ariaLabel || props._label,
						},
						' aria-hidden="true"'
				  )
				: ''
		}
    </kol-link-wc>
  </mock:shadow-root>
  ${innerHTML}
</kol-link>`;
};
