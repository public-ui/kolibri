import { mixMembers } from 'stencil-awesome-test';

import { Props } from '../types';
import { KolButtonWcTag, KolHeadingWcTag } from '../../../core/component-names';

export const getAccordionHtml = (
	props: Props,
	slots: {
		header?: string;
		content?: string;
		footer?: string;
	} = {},
): string => {
	props = mixMembers(
		{
			_label: '…', // ⚠ required
			_level: 1,
		},
		props,
	);
	return `<kol-accordion${props._open ? ' _open' : ''} class="kol-accordion">
  <mock:shadow-root>
    <div class="accordion${props._open ? ' open' : ''}">
			<${KolHeadingWcTag} _label="" _level="${props._level}">
			<${KolButtonWcTag}
				_ariaControls="nonce"
				${props._open ? '_ariaExpanded=""' : ''}
				_icons="codicon codicon-${props._open ? 'remove' : 'add'}"
				_label="${props._label}"
			></${KolButtonWcTag}>
		</${KolHeadingWcTag}>
			 <div class="header">
        <slot name="header"></slot>
      </div>
			<div class="wrapper">
				<div class="animation-wrapper">
					<div class="content" id="nonce" ${props._open ? '' : 'aria-hidden="true"'}>
						<slot name="content"></slot>
						<slot></slot>
					</div>
				</div>
			</div=>
    </div>
  </mock:shadow-root>
  ${slots.header !== undefined ? slots.header : ''}
  ${slots.content !== undefined ? slots.content : ''}
  ${slots.footer !== undefined ? slots.footer : ''}
</kol-accordion>`;
};
