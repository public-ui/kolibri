import { mixMembers } from 'stencil-awesome-test';

import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { koliBriCardProps } from '../types';

export const getCardHtml = (props: koliBriCardProps): string => {
	props = mixMembers(
		{
			_heading: '…',
		},
		props
	);
	return `<kol-card>
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
				<slot name="content"></slot>
				<slot />
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
