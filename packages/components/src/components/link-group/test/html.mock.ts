import { mixMembers } from 'stencil-awesome-test';

import type { LinkGroupProps } from '../../../schema';

export const getLinkGroupHtml = (props: LinkGroupProps): string => {
	props = mixMembers(
		{
			_listStyleType: 'disc',
			_links: [],
			_orientation: 'vertical',
		},
		props,
	);
	return `
<kol-link-group  class="kol-link-group">
  <mock:shadow-root>
		<ul ${props._label !== null ? `aria-label="${props._label}"` : ''} class="${props._orientation !== null ? props._orientation : 'vertical'}"></ul>
  </mock:shadow-root>
</kol-link-group>`;
};
