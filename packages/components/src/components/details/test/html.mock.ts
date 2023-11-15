import { mixMembers } from 'stencil-awesome-test';

import { getIconHtml } from '../../icon/test/html.mock';
import { getIndentedTextHtml } from '../../indented-text/test/html.mock';
import { Props } from '../types';

export const getDetailsHtml = (
	props: Props,
	slots: {
		default?: string;
	} = {}
): string => {
	props = mixMembers(
		{
			_label: '…',
		},
		props
	);
	return `<kol-details${props._open ? ' _open' : ''}>
	<mock:shadow-root>
		<details>
			<summary>
				${getIconHtml(
					{
						_label: '',
						_icons: 'codicon codicon-chevron-right',
					},
					`class="icon${props._open ? ' is-open' : ''}"`
				)}
				<span>
					${props._label}
				</span>
			</summary>
			<div${props._open ? `` : ` aria-hidden="true"`} class="content">
				${getIndentedTextHtml(props, slots)}
			</div>
		</details>
	</mock:shadow-root>
</kol-details>`;
};
