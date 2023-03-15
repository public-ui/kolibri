import { mixMembers } from 'stencil-awesome-test';
import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
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
			_heading: '…', // ⚠ required
			_level: 1,
		},
		props
	);
	const open = props._open === true;
	return `<kol-accordion${open ? ' _open' : ''}>
  <mock:shadow-root>
    <div class="accordion ${open ? 'open' : 'close'}">
      ${getHeadingWcHtml(
				{
					_headline: '',
					_level: props._level,
				},
				{
					default: `${getButtonWcHtml({
						_ariaControls: 'nonce',
						_ariaExpanded: open,
						_icon: `fa-solid fa-${open ? 'minus' : 'plus'}`,
						_label: props._heading,
					})}`,
				}
			)}
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content" id="nonce" ${open ? '' : 'aria-hidden="true" hidden style="display: none; height: 0; visibility: hidden;"'}>
        <slot name="content"></slot>
      </div>
    </div>
  </mock:shadow-root>
  ${slots.header !== undefined ? slots.header : ''}
  ${slots.content !== undefined ? slots.content : ''}
  ${slots.footer !== undefined ? slots.footer : ''}
</kol-accordion>`;
};
