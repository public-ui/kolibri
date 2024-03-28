import { mixMembers } from 'stencil-awesome-test';

import type { LinkButtonProps } from '@public-ui/schema';
import { KolLinkWcTag } from '../../../core/component-names';

export const getLinkButtonHtml = (props: LinkButtonProps): string => {
	props = mixMembers(
		{
			_label: '',
			_href: '',
		},
		props,
	);
	return `
<kol-link-button  class="kol-link-button">
  <mock:shadow-root>
	<${KolLinkWcTag}
			${props._href ? `_href="${props._href}"` : ''}
			${props._label ? `_label="${props._label}"` : ''}
			${props._icons ? `_icons="${props._icons}"` : ''}
			_role="button"
			_tooltipalign="right"
			class="button normal"
		>
	       <slot name="expert" slot="expert"></slot>
	</${KolLinkWcTag}>
  </mock:shadow-root>
</kol-link-button>`;
};
