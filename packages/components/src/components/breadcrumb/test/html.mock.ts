import { mixMembers } from 'stencil-awesome-test';

import { KolIconTag, KolLinkTag } from '../../../core/component-names';

import type { AnyIconFontClass, BreadcrumbLinkProps, BreadcrumbProps, LabelPropType } from '@public-ui/schema';

export const getBreadcrumbHtml = (props: BreadcrumbProps): string => {
	const state = mixMembers(
		{
			_label: '', // ⚠ required
			_links: [],
		},
		props,
	);

	const lastIndex = state._links.length - 1;
	let list = '';
	(state._links as BreadcrumbLinkProps[]).forEach((link, index) => {
		list += `
				<li>
				${index !== 0 ? `<${KolIconTag} _label="" _icons="codicon codicon-chevron-right" /> </${KolIconTag}>` : ''}
					${
						lastIndex === index
							? `<span>${link._hideLabel ? `<${KolIconTag} _label="${link._label}" _icons="${link._icons as AnyIconFontClass}" /></${KolIconTag}>` : link._label}</span>`
							: `<${KolLinkTag} {...link}></${KolLinkTag}>`
					}
				</li>
			`;
	});

	return `
<kol-breadcrumb class="kol-breadcrumb">
  <mock:shadow-root>
		<nav aria-label="${state._label as unknown as LabelPropType}">
			<ul>
				${state._links.length === 0 ? `<li>	<${KolIconTag} _label="" _icons="codicon codicon-home" /> </${KolIconTag}>…</li>` : ''}
				${list}
			</ul>
		</nav>
  </mock:shadow-root>
</kol-breadcrumb>`;
};
