import { mixMembers } from 'stencil-awesome-test';

import { LabelPropType } from '../../../components';
import { Icofont } from '../../../types/icofont';
import { getIconHtml } from '../../icon/test/html.mock';
import { getLinkHtml } from '../../link/test/html.mock';
import { BreadcrumbLinkProps, KoliBriBreadcrumbProps } from '../types';

export const getBreadcrumbHtml = (props: KoliBriBreadcrumbProps): string => {
	const state = mixMembers(
		{
			_label: '…', // ⚠ required
			_links: [],
		},
		props
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
								_icon: 'codicon codicon-chevron-right',
						  })
						: ''
				}
					${
						lastIndex === index
							? `<span>${
									link._hideLabel
										? getIconHtml({
												_label: link._label as LabelPropType,
												_icon: link._icon as Icofont,
										  })
										: (link._label as LabelPropType)
							  }</span>`
							: getLinkHtml(link)
					}
				</li>
			`;
	});

	return `
<kol-breadcrumb>
  <mock:shadow-root>
		<nav aria-label="${state._label as unknown as LabelPropType}">
			<ul>
				${
					state._links.length === 0
						? `<li>${getIconHtml({
								_label: '',
								_icon: 'codicon codicon-home',
						  })}…</li>`
						: ''
				}
				${list}
			</ul>
		</nav>
  </mock:shadow-root>
</kol-breadcrumb>`;
};
