import { mixMembers } from 'stencil-awesome-test';

import { Icofont } from '../../../types/icofont';
import { getIconHtml } from '../../icon/test/html.mock';
import { getLinkHtml } from '../../link/test/html.mock';
import { Props, States } from '../types';

export const getBreadcrumbHtml = (props: Props): string => {
	const state = mixMembers<Props, States>(
		{
			_label: '…',
			_links: [],
		},
		props
	);

	const lastIndex = state._links.length - 1;
	let list = '';
	state._links.forEach((link, index) => {
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
												_icons: link._icon as Icofont,
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
		<nav aria-label="${state._label}">
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
