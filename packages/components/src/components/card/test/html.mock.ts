import { mixMembers } from 'stencil-awesome-test';

import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { Props } from '../types';

export const getCardHtml = (props: Props): string => {
	props = mixMembers(
		{
			_label: '…', // ⚠ required
		},
		props
	);
	return `<kol-card class="kol-card">
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
					},
					` class="kol-heading-wc"`
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
			${
				props._hasCloser
					? getButtonWcHtml(
							{
								_hideLabel: true,
								_icons: {
									left: {
										icon: 'codicon codicon-close',
									},
								},
								_label: 'kol-close',
								_tooltipAlign: 'left',
							},
							undefined,
							' class="close"'
					  )
					: ``
			}
		</div>
	</mock:shadow-root>
</kol-card>`;
};
