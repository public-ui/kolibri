import { mixMembers } from 'stencil-awesome-test';

import { formatLabelAsInitials } from '../controller';
import { Props, States } from '../types';

export const getAvatarHtml = (props: Props): string => {
	const state = mixMembers<Props, States>(
		{
			_src: '',
			_label: '…', // ⚠ required
		},
		props
	);

	return `
<kol-avatar class="kol-avatar">
  <mock:shadow-root>
		<kol-avatar-wc class="kol-avatar-wc">
			<div aria-label="kol-avatar-alt" class="container" role="img">
				${
					state._src
						? `<img alt="" aria-hidden="true" class="image" src="${state._src}" />`
						: `<span aria-hidden="true" class="initials">
							${formatLabelAsInitials(state._label)}
						 </span>`
				}
			</div>
		</mock:shadow-root>
	</kol-avatar-wc>
</kol-avatar>
`;
};
