import type { LinkProps, SkipNavProps, SkipNavStates } from '../../../schema';
import { mixMembers } from 'stencil-awesome-test';
import { KolLinkWcTag } from '../../../core/component-names';

export const getSkipNavHtml = (props: SkipNavProps): string => {
	const state = mixMembers<SkipNavProps, SkipNavStates>(
		{
			_label: '', // ⚠ required
			_links: [],
		},
		props,
	);

	return `
<kol-skip-nav  class="kol-skip-nav">
  <mock:shadow-root>
	<nav aria-label="${props._label ? props._label : ''}">
          <ul>
					${state._links
						.map((link: LinkProps) => {
							return `<li>
								<${KolLinkWcTag}  _label="${link._label}" ></${KolLinkWcTag}>
							</li>`;
						})
						.join('')}
					</ul>
       </nav>
  </mock:shadow-root>
</kol-skip-nav>`;
};
