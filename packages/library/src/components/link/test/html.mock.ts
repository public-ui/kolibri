import { mixMembers } from 'stencil-awesome-test';
import { LinkProps } from '../../../types/button-link';
import { isEmptyOrPrefixOf } from '../../../utils/validator';
import { getIconHtml } from '../../icon/test/html.mock';
import { getSpanWcHtml } from '../../span/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';

export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	props = mixMembers(
		{
			_ariaLabel: '',
			_fill: false,
			_href: '',
			_iconAlign: 'left',
			_iconOnly: false,
			_label: '',
			_stealth: false,
			_underline: true,
			_useCase: 'text',
			_tooltipAlign: 'right',
			_targetDescription: 'Der Link wird in einem neuen Tab geöffnet.',
		},
		props
	);
	let underline = props._underline;
	if (props._useCase === 'image') {
		underline = false;
	}
	if (typeof props._ariaLabel === 'string' && isEmptyOrPrefixOf(props._label, props._ariaLabel) === false) {
		if (props._label.length > 0) {
			props._ariaLabel = props._label;
		} else {
			props._label = props._ariaLabel;
		}
	}
	return `
<kol-link${props._ariaExpanded ? ' _aria-expanded' : ''}${props._iconOnly ? ' _icon-only' : ''}${props._stealth ? ' _stealth' : ''}${
		props._underline ? ' _underline' : ''
	}>
  <mock:shadow-root>
  <kol-link-wc${props._ariaExpanded ? ' _aria-expanded' : ''}${props._iconOnly ? ' _icon-only' : ''}${props._stealth ? ' _stealth' : ''}${
		props._underline ? ' _underline' : ''
	}>
    <a${typeof props._ariaExpanded === 'boolean' ? ` aria-expanded="${props._ariaExpanded ? 'true' : 'false'}"` : ''}${
		props._iconOnly === true || props._useCase === 'image' ? ` aria-labelledby="nonce"` : ''
	} class="${props._stealth === true ? ' skip' : ''}${props._useCase === 'nav' ? '' : ' kol-visited'}${
		props._iconOnly === true ? ' icon-only grid text-center' : ' flex flex-wrap items-center'
	}" href="${typeof props._href === 'string' && props._href.length > 0 ? props._href : 'javascript:void(0)'}" part="link ${
		typeof props._part === 'string' ? props._part : ''
	}"${typeof props._selector === 'string' ? ' role="link" tabindex="0"' : ''}${
		typeof props._target === 'string' ? `${props._target === '_self' ? '' : 'rel="noopener"'} target="${props._target}"` : ''
	} style="cursor:pointer;${props._useCase === 'image' ? 'display: block;' : ''}text-decoration-line:${underline === true ? 'underline' : 'none'};${
		props._fill === true ? 'width:100%;' : ''
	}">
			${getSpanWcHtml(
				props,
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
								_icon: 'fa-solid fa-arrow-up-right-from-square',
							},
							' class="external-link"'
					  )
					: ''
			}
    </a>
		${
			props._iconOnly === true || props._useCase === 'image'
				? getTooltipHtml(
						{
							_align: props._tooltipAlign,
							_id: props._iconOnly === true || props._useCase === 'image' ? 'nonce' : undefined,
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
