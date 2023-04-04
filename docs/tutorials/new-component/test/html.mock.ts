/**
 *  erzeugt die Componente als String, um es mit dem Original vergleichen zu können
 */
import { mixMembers } from 'stencil-awesome-test';
import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { Props } from '../component';

export const getNewComponentHtml = (
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
	return `<kol-new-component${open ? ' _open' : ''}>
  <mock:shadow-root>
    <div class="new-component ${open ? 'open' : 'close'}">
      ${getHeadingWcHtml(
				{
					_headline: '',
					_level: props._level,
				},
				{
					default: `${getButtonWcHtml({
						_ariaControls: 'nonce',
						_ariaExpanded: open,
						_icon: `codicon codicon-${open ? 'chrome-minimize' : 'add'}`,
						_label: props._heading,
					})}`,
				}
			)}
      <div class="content" id="nonce" ${open ? '' : 'aria-hidden="true" hidden style="display: none; height: 0; visibility: hidden;"'}>
        <slot name="content"></slot>
      </div>
    </div>
  </mock:shadow-root>
  ${slots.header !== undefined ? slots.header : ''}
  ${slots.content !== undefined ? slots.content : ''}
  ${slots.footer !== undefined ? slots.footer : ''}
</kol-new-component>`;
};
