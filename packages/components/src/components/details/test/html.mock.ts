import { mixMembers } from 'stencil-awesome-test';

import type { DetailsProps } from '../../../schema';
import { KolButtonWcTag, KolHeadingWcTag } from '../../../core/component-names';

export const getDetailsHtml = (props: DetailsProps): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
		},
		props,
	);

	return `<kol-details${props._open ? ' _open' : ''}  class="kol-details">
	<mock:shadow-root>
		<div class="collapsible details${props._disabled ? ' disabled' : ''}${props._open ? ' open' : ''}" id="nonce">
			<${KolHeadingWcTag} _label="" _level="${1}" class="collapsible__heading details__heading">
				<${KolButtonWcTag}
					class="collapsible__heading-button details__heading-button"
					slot="expert"
					_ariaControls="nonce-control"
					${props._open ? '_ariaExpanded=""' : ''}
					${props._disabled ? '_disabled=""' : ''}
					_icons="codicon codicon-chevron-right"
					_label="${props._label}"
				></${KolButtonWcTag}>
			</${KolHeadingWcTag}>
			<div class="collapsible__wrapper details__wrapper">
    	        <div class="collapsible__wrapper-animation details__wrapper-animation">
    	        	<div${props._open ? '' : ' aria-hidden="true"'} class="collapsible__content details__content indented-text" id="nonce-control">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</mock:shadow-root>
</kol-details>`;
};
