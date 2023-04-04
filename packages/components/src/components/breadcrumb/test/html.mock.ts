import { mixMembers } from 'stencil-awesome-test';
import { LinkProps } from '../../../types/button-link';
import { Icofont } from '../../../types/icofont';
import { getIconHtml } from '../../icon/test/html.mock';
import { getLinkHtml } from '../../link/test/html.mock';
import { Props } from '../component';

export const getBreadcrumbHtml = (props: Props): string => {
	props = mixMembers(
		{
			_ariaLabel: '…', // '⚠'
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
								_ariaLabel: '',
								_icon: 'codicon codicon-chevron-right',
						  })
						: ''
				}
					${
						lastIndex === index
							? `<span>${
									link._iconOnly
										? getIconHtml({
												_ariaLabel: link._ariaLabel as string,
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
		<nav aria-label="${props._ariaLabel}">
			<ul>
				${
					props._links.length === 0
						? `<li>${getIconHtml({
								_ariaLabel: '',
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
