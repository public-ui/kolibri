import {mixMembers} from 'stencil-awesome-test';

import {Props, States} from '../types';
import {formatLabelAsInitials} from "../component";

export const getAvatarHtml = (props: Props): string => {
	const state = mixMembers<Props, States>(
		{
			_src: ``,
			_label: ``, // ⚠ required
		},
		props
	);
	return `<kol-avatar>
  <mock:shadow-root>
    <kol-avatar-wc>
			${state._src
		? `<img
						src={state._src}
						alt={state._label}
						class="image"
					/>`
		: `<div class="initials">
						${formatLabelAsInitials(state._label)}
					 </div>`}
    </kol-avatar-wc>
  </mock:shadow-root>
</kol-avatar>`;
};
