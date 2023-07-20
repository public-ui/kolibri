import { mixMembers } from 'stencil-awesome-test';

import { getIconHtml } from '../../icon/test/html.mock';
import { getIndentedTextHtml } from '../../indented-text/test/html.mock';
import { KoliBriDetailsProps } from '../types';

export const getDetailsHtml = (
	props: KoliBriDetailsProps,
	slots: {
		default?: string;
	} = {}
): string => {
	props = mixMembers(
		{
			_summary: '…',
		},
		props
	);
	return `<kol-details${props._open ? ' _open' : ''}>
	<mock:shadow-root>
		<details${props._open ? ' open' : ''}>
			<summary>
				${getIconHtml({
					_label: '',
					_icon: props._open ? 'codicon codicon-chevron-down' : 'codicon codicon-chevron-right',
				})}
				<span>
					${props._summary}
				</span>
			</summary>
			<div class="content">
				${getIndentedTextHtml(props, slots)}
			</div>
		</details>
	</mock:shadow-root>
</kol-details>`;
};
