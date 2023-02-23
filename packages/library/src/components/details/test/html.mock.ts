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
				<span>
					${getIconHtml({
						_ariaLabel: '',
						_icon: props._open ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-right',
					})}
				</span>
				<span>
					${props._summary}
				</span>
			</summary>
			${getIndentedTextHtml(props, slots)}
		</details>
	</mock:shadow-root>
</kol-details>`;
};
