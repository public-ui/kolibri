import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { avatarPropsConfig, type AvatarApi } from '../../../../internals/src/controller/avatar/api';
import type { FunctionalComponentProps } from '../../../../internals/src/controller/generic-types';
import { resolveFcProps } from '../../../../internals/src/controller/props-from-config';
import { translate } from '../../../../internals/src/i18n';
import { bem } from '../../../../internals/src/schema/bem-registry';
import { trimLabel } from '../../../../internals/src/schema/index';

const avatarBem = bem.forBlock('kol-avatar');
const BEM_CLASS_AVATAR = avatarBem();
const BEM_CLASS_AVATAR__IMAGE = avatarBem('image');
const BEM_CLASS_AVATAR__INITIALS = avatarBem('initials');

export const AvatarFC: FC<FunctionalComponentProps<AvatarApi>> = (props) => {
	const { color, initials, label, src } = resolveFcProps(avatarPropsConfig, props);

	return (
		<div
			aria-label={translate('kol-avatar-alt', { placeholders: { name: trimLabel(label) } })}
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
