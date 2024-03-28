import { mixMembers } from 'stencil-awesome-test';

import type { LinkGroupProps } from '@public-ui/schema';

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
		<ul ${props._label ? `aria-label="${props._label}"` : ''} class="vertical"></ul>
  </mock:shadow-root>
</kol-link-group>`;
};
