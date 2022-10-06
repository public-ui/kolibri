import { mixMembers } from 'stencil-awesome-test';
import { getIconIcofontHtml } from '../../icon-icofont/test/html.mock';
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
				${getIconIcofontHtml({
					_ariaLabel: '',
					_icon: props._open ? 'rounded-down' : 'rounded-right',
				})}
				<span>
					${props._summary}
				</span>
			</summary>
			${getIndentedTextHtml(props, slots)}
		</details>
	</mock:shadow-root>
</kol-details>`;
};
