import { mixMembers } from 'stencil-awesome-test';
import { LinkProps } from '../../../types/button-link';
import { getIconHtml } from '../../icon/test/html.mock';
import { getTooltipHtml } from '../../tooltip/test/html.mock';

export const getLinkHtml = (props: LinkProps, innerHTML = ''): string => {
	props = mixMembers(
		{
			_ariaLabel: '',
			_fill: false,
			_href: '',
			_iconAlign: 'left',
			_iconOnly: false,
			_stealth: false,
			_underline: true,
			_useCase: 'text',
			_tooltipAlign: 'right',
			_targetDescription: 'Der Link wird in einem neuen Tab geöffnet.',
		},
		props
	);
	if (props._useCase === 'image') {
		props._underline = false;
	}
	return `
<kol-link>
  <mock:shadow-root>
  <kol-link-wc>
    <a${typeof props._ariaExpanded === 'boolean' ? ` aria-expanded="${props._ariaExpanded ? 'true' : 'false'}"` : ''}${
		props._iconOnly === true || props._useCase === 'image' ? ` aria-labelledby="nonce"` : ''
	} class="${props._stealth === true ? ' skip' : ''}${props._useCase === 'nav' ? '' : ' kol-visited'}${
		props._iconOnly === true ? ' grid text-center' : ' flex flex-wrap items-center'
	}" href="${typeof props._href === 'string' && props._href.length > 0 ? props._href : 'javascript:void(0)'}" part="link ${
		typeof props._part === 'string' ? props._part : ''
	}"${typeof props._selector === 'string' ? ' role="link" tabindex="0"' : ''}${
		typeof props._target === 'string' ? `${props._target === '_self' ? '' : 'rel="noopener"'} target="${props._target}"` : ''
	} style="cursor:pointer;${props._useCase === 'image' ? 'display: block;' : ''}text-decoration-line:${props._underline === true ? 'underline' : 'none'};${
		props._fill === true ? 'width:100%;' : ''
	}">
      ${
				typeof props._icon === 'string' && props._iconAlign === 'left'
					? getIconHtml(
							{
								_ariaLabel: '',
								_icon: props._icon,
							},
							props._iconOnly === true ? '' : ' class="mr-2"'
					  )
					: ''
			}
      <span class="${props._iconOnly === true ? 'hidden' : ''}${props._useCase === 'image' ? 'float-left' : ''}" part="span${
		props._iconOnly === true ? ' hidden' : ''
	}">
        <slot />
      </span>
      ${
				typeof props._icon === 'string' && props._iconAlign === 'right'
					? getIconHtml(
							{
								_ariaLabel: '',
								_icon: props._icon,
							},
							props._iconOnly === true ? '' : ' class="ml-2"'
					  )
					: ''
			}
      ${
				typeof props._target === 'string' && props._target !== '_self'
					? getIconHtml({
							_ariaLabel: 'Der Link wird in einem neuen Tab geöffnet.',
							_icon: 'fa-solid fa-arrow-up-right-from-square',
					  })
					: ''
			}
    </a>
    ${getTooltipHtml({
			_align: props._tooltipAlign,
			_id: props._iconOnly === true || props._useCase === 'image' ? 'nonce' : undefined,
			_label: props._iconOnly === true && typeof props._ariaLabel === 'string' ? props._ariaLabel : '',
		})}
    </kol-link-wc>
  </mock:shadow-root>
  ${innerHTML}
</kol-link>`;
};
