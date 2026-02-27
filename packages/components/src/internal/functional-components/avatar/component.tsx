import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import type { AvatarApi } from './api';

const BEM_BLOCK_AVATAR = 'kol-avatar';
const BEM_CLASS_AVATAR__IMAGE = bem(BEM_BLOCK_AVATAR, 'image');
const BEM_CLASS_AVATAR__INITIALS = bem(BEM_BLOCK_AVATAR, 'initials');

export const AvatarFC: FC<FunctionalComponentProps<AvatarApi>> = (props) => {
	const { color, initials, label, src } = props;

	return (
		<div
			aria-label={translate('kol-avatar-alt', { placeholders: { name: label } })}
			class="kol-avatar"
			role="img"
			style={{
				backgroundColor: color.backgroundColor,
				color: color.foregroundColor,
			}}
		>
			{src ? (
				<img alt="" aria-hidden="true" class={BEM_CLASS_AVATAR__IMAGE} src={src} />
			) : (
				<span aria-hidden="true" class={BEM_CLASS_AVATAR__INITIALS}>
					{initials}
				</span>
			)}
		</div>
	);
};
