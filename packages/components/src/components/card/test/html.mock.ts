import { mixMembers } from 'stencil-awesome-test';

import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { Props } from '../types';
import { KolButtonWcTag, KolHeadingWcTag } from '../../../core/component-names';

export const getCardHtml = (props: Props): string => {
	props = mixMembers(
		{
			_label: '…', // ⚠ required
		},
		props,
	);
	return `<kol-card class="kol-card">
	<mock:shadow-root>
		<div class="card">
			<div class="header">
				<${KolHeadingWcTag} _label="${props._label}" _level="${props._level ? props._level : '1'}"></${KolHeadingWcTag}>
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
					? `<${KolButtonWcTag}
					class="close"
					_hideLabel=""
					_label='kol-close'
					_tooltipAlign="left"
				></${KolButtonWcTag}>`
					: ``
			}
		</div>
	</mock:shadow-root>
</kol-card>`;
};
