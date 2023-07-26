import { mixMembers } from 'stencil-awesome-test';

import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { koliBriCardProps } from '../types';

export const getCardHtml = (props: koliBriCardProps): string => {
	props = mixMembers(
		{
			_label: '…',
		},
		props
	);
	return `<kol-card>
	<mock:shadow-root>
		<div class="card">
			<div class="header">
				${getHeadingWcHtml(
					{
						_label: props._label!, // TODO v2: Remove non-null assertion after label was converted to required prop.
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
