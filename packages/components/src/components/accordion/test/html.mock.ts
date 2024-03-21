import { mixMembers } from 'stencil-awesome-test';

import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';

import type { AccordionProps } from '@public-ui/schema';

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
      ${getHeadingWcHtml(
				{
					_label: '',
					_level: props._level,
				},
				{
					expert: `${getButtonWcHtml(
						{
							_ariaControls: 'nonce',
							_ariaExpanded: props._open === true,
							_disabled: props._disabled,
							_icons: `codicon codicon-${props._open ? 'remove' : 'add'}`,
							_label: props._label,
						},
						undefined,
						' class="accordion-button kol-button-wc" slot="expert"',
					)}`,
				},
				` class="accordion-heading kol-heading-wc"`,
			)}
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
