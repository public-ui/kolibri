import { mixMembers } from 'stencil-awesome-test';
import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { Props } from '../types';

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
	return `<kol-accordion${props._open ? ' _open' : ''}>
  <mock:shadow-root>
    <div class="accordion ${props._open ? 'open' : 'close'}">
      ${getHeadingWcHtml(
				{
					_label: '',
					_level: props._level,
				},
				{
					default: `${getButtonWcHtml({
						_ariaControls: 'nonce',
						_ariaExpanded: props._open === true,
						_icon: `codicon codicon-${props._open ? 'chrome-minimize' : 'add'}`,
						_label: props._heading,
					})}`,
				}
			)}
      <div class="header">
        <slot name="header"></slot>
      </div>
			<div class="wrapper">
				<div class="content" id="nonce" ${props._open ? '' : 'aria-hidden="true"'}>
					<slot name="content"></slot>
					<slot />
				</div>
			</div=>
    </div>
  </mock:shadow-root>
  ${slots.header !== undefined ? slots.header : ''}
  ${slots.content !== undefined ? slots.content : ''}
  ${slots.footer !== undefined ? slots.footer : ''}
</kol-accordion>`;
};
