import { mixMembers } from 'stencil-awesome-test';

import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { Props } from '../types';

export const getCardHtml = (props: Props): string => {
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
						_label: props._label,
						_level: props._level,
					},
					{
						default: '',
					}
				)}
			</div>
			<div class="content">
				<slot />
			</div>
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
