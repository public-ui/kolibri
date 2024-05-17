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
    <div class="accordion${props._disabled ? ' disabled' : ''}${props._open ? ' open' : ''}">
			<${KolHeadingWcTag} _label="" _level="${props._level}" class="accordion-heading">
			<${KolButtonWcTag}
				class="accordion-button"
				slot="expert"
				_ariaControls="nonce"
				${props._open ? '_ariaExpanded=""' : ''}
				${props._disabled ? '_disabled=""' : ''}
				_icons="codicon codicon-${props._open ? 'remove' : 'add'}"
				_label="${props._label}"
			></${KolButtonWcTag}>
		</${KolHeadingWcTag}>

			<div class="wrapper">
				<div class="animation-wrapper">
					<div class="content" id="nonce" ${props._open ? '' : 'aria-hidden="true"'}>
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
