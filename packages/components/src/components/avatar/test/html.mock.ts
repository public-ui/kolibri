import { mixMembers } from 'stencil-awesome-test';

import { getImageHtml } from '../../image/test/html.mock';
import { formatLabelAsInitials } from '../controller';
import { Props, States } from '../types';

export const getAvatarHtml = (props: Props): string => {
	const state = mixMembers<Props, States>(
		{
			_src: ``,
			_label: ``, // ⚠ required
		},
		props
	);

	return `
<kol-avatar>
  <mock:shadow-root>
		<kol-avatar-wc>
			<div aria-description="${state._label}" class="container">
				${
					state._src
						? getImageHtml({ _alt: 'kol-avatar-alt', _src: state._src }, ' class="image"')
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
