import { mixMembers } from 'stencil-awesome-test';

import { formatLabelAsInitials } from '../controller';

import type { AvatarProps, AvatarStates } from '@public-ui/schema';

export const getAvatarHtml = (props: AvatarProps): string => {
	const state = mixMembers<AvatarProps, AvatarStates>(
		{
			_src: '',
			_label: '', // ⚠ required
		},
		props
	);

	return `
<kol-avatar>
  <mock:shadow-root>
		<kol-avatar-wc>
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
