import { mixMembers } from 'stencil-awesome-test';

import { getIconHtml } from '../../icon/test/html.mock';
import { getLinkHtml } from '../../link/test/html.mock';

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
				${
					index !== 0
						? getIconHtml({
								_label: '',
								_icons: 'codicon codicon-chevron-right',
							})
						: ''
				}
					${
						lastIndex === index
							? `<span>${
									link._hideLabel
										? getIconHtml({
												_label: link._label,
												_icons: link._icons as AnyIconFontClass,
											})
										: link._label
								}</span>`
							: getLinkHtml(link)
					}
				</li>
			`;
	});

	return `
<kol-breadcrumb class="kol-breadcrumb">
  <mock:shadow-root>
		<nav aria-label="${state._label as unknown as LabelPropType}">
			<ul>
				${
					state._links.length === 0
						? `<li>${getIconHtml({
								_label: '',
								_icons: 'codicon codicon-home',
							})}…</li>`
						: ''
				}
				${list}
			</ul>
		</nav>
  </mock:shadow-root>
</kol-breadcrumb>`;
};
