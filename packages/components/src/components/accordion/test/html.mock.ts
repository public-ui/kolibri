import { mixMembers } from 'stencil-awesome-test';

import type { AccordionProps } from '../../../schema';
import { KolButtonWcTag, KolHeadingWcTag } from '../../../core/component-names';

export const getAccordionHtml = (
	props: AccordionProps,
	slots: {
		default?: string;
		footer?: string;
	} = {},
): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
			_level: 1,
		},
		props,
	);
	return `<kol-accordion${props._open ? ' _open' : ''} class="kol-accordion">
  <mock:shadow-root>
    <div class="accordion collapsible${props._disabled ? ' disabled' : ''}${props._open ? ' open' : ''}" id="nonce">
		<${KolHeadingWcTag} _label="" _level="${props._level}" class="accordion__heading collapsible__heading">
			<${KolButtonWcTag}
				class="accordion__heading-button collapsible__heading-button"
				slot="expert"
				_ariaControls="nonce-control"
				${props._open ? '_ariaExpanded=""' : ''}
				${props._disabled ? '_disabled=""' : ''}
				_icons="codicon codicon-${props._open ? 'remove' : 'add'}"
				_label="${props._label}"
			></${KolButtonWcTag}>
		</${KolHeadingWcTag}>

			<div class="accordion__wrapper collapsible__wrapper">
				<div class="accordion__wrapper-animation collapsible__wrapper-animation">
					<div class="accordion__content collapsible__content" id="nonce-control" ${props._open ? '' : 'aria-hidden="true"'}>
						<slot />
					</div>
				</div>
			</div=>
    </div>
  </mock:shadow-root>
  ${slots.default !== undefined ? slots.default : ''}
  ${slots.footer !== undefined ? slots.footer : ''}
</kol-accordion>`;
};
