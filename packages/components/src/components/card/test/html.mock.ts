import { mixMembers } from 'stencil-awesome-test';

import type { CardProps } from '../../../schema';
import { KolHeadingWcTag, KolButtonWcTag } from '../../../core/component-names';

export const getCardHtml = (props: CardProps): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
		},
		props,
	);
	return `<kol-card class="kol-card">
	<mock:shadow-root>
		<div class="card">
			<div class="header">
			<${KolHeadingWcTag} _label="${props._label}" _level="${props._level ? props._level : '1'}"></${KolHeadingWcTag}>
			</div>
			<div class="content">
				<slot />
			</div>
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
