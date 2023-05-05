import { mixMembers } from 'stencil-awesome-test';
import { getIconHtml } from '../../icon/test/html.mock';
import { getIndentedTextHtml } from '../../indented-text/test/html.mock';
import { Props } from '../component';

export const getDetailsHtml = (
	props: Props,
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
					_ariaLabel: '',
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
