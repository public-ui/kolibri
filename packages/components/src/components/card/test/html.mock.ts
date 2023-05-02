import { mixMembers } from 'stencil-awesome-test';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { Props } from '../component';

export const getCardHtml = (props: Props): string => {
	props = mixMembers(
		{
			_heading: '…',
		},
		props
	);
	return `<kol-card${props._hasFooter ? ' _has-footer' : ''}>
	<mock:shadow-root>
		<div class="card">
			<div class="header">
				${getHeadingWcHtml(
					{
						_label: props._heading,
						_level: props._level,
					},
					{
						default: '',
					}
				)}
				<slot name="header"></slot>
			</div>
			<div class="content">
				<slot name="content"/>
			</div>
			${
				props._hasFooter
					? `<div class="footer">
							<slot name="footer"></slot>
						</div>`
					: ''
			}
		</div>
	</mock:shadow-root>
</kol-card>`;
};
