import { mixMembers } from 'stencil-awesome-test';
import { LinkProps } from '../../../types/button-link';
import { Icofont } from '../../../types/icofont';
import { getIconHtml } from '../../icon/test/html.mock';
import { getLinkHtml } from '../../link/test/html.mock';
import { KoliBriBreadcrumbProps } from '../types';

export const getBreadcrumbHtml = (props: KoliBriBreadcrumbProps): string => {
	props = mixMembers(
		{
			_label: '…', // '⚠'
			_links: [],
		},
		props
	);

	const lastIndex = props._links.length - 1;
	let list = '';
	(props._links as LinkProps[]).forEach((link, index) => {
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
									link._iconOnly
										? getIconHtml({
												_label: link._label,
												_icon: link._icon as Icofont,
										  })
										: link._label
							  }</span>`
							: getLinkHtml(link)
					}
				</li>
			`;
	});

	return `
<kol-breadcrumb>
  <mock:shadow-root>
		<nav aria-label="${props._label || ''}">
			<ul>
				${
					props._links.length === 0
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
