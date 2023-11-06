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
		<details${props._open ? ` style="height: 0px;"` : ``}>
			<summary>
				${getIconHtml({
					_label: '',
					_icons: props._open ? 'codicon codicon-chevron-down' : 'codicon codicon-chevron-right',
				})}
				<span>
					${props._label! /* TODO v2: Remove non-null assertion after label was converted to required prop */}
				</span>
			</summary>
			<div${props._open ? `` : ` aria-hidden="true"`} class="content">
				${getIndentedTextHtml(props, slots)}
			</div>
		</details>
	</mock:shadow-root>
</kol-details>`;
};
