import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import type { AvatarApi } from './api';

const avatarBem = bem.forBlock('kol-avatar');
const BEM_CLASS_AVATAR = avatarBem();
const BEM_CLASS_AVATAR__IMAGE = avatarBem('image');
const BEM_CLASS_AVATAR__INITIALS = avatarBem('initials');

export const AvatarFC: FC<FunctionalComponentProps<AvatarApi>> = (props) => {
	const { color, initials, label, src } = props;

	return (
		<div
			aria-label={translate('kol-avatar-alt', { placeholders: { name: label } })}
			class={BEM_CLASS_AVATAR}
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
