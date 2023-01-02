import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { getIconHtml } from '../../icon/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getAccordionHtml = (
	props: Props,
	slots: {
		header?: string;
		content?: string;
		footer?: string;
	} = {}
): string => {
	props = mixMembers(
		{
			_heading: '⚠',
			_level: 1,
		},
		props
	);
	return `<kol-accordion${props._open ? ' _open' : ''}>
  <mock:shadow-root>
    <div part="accordion ${props._open ? 'open' : 'close'}">
      ${getHeadingWcHtml(
				{
					_level: props._level,
				},
				{
					default: `<button>
							${getIconHtml({
								_ariaLabel: '',
								_icon: props._open ? 'fa-solid fa-minus' : 'fa-solid fa-plus',
								_part: props._open ? 'close' : 'open',
							})}
							<span>
								${props._heading}
							</span>
						</button>`,
				}
			)}

      <div part="header">
        <slot name="header"></slot>
      </div>
      <div part="content"${props._open ? '' : ' style="display: none; height: 0; visibility: hidden;"'}>
        <slot name="content"></slot>
      </div>
    </div>
  </mock:shadow-root>
  ${slots.header !== undefined ? slots.header : ''}
  ${slots.content !== undefined ? slots.content : ''}
  ${slots.footer !== undefined ? slots.footer : ''}
</kol-accordion>`;
};
