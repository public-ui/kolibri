import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../../i18n';
import { trimLabel } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { resolveFcProps } from '../props-from-config';
import { avatarPropsConfig, type AvatarApi } from './api';

const avatarBem = bem.forBlock('kol-avatar');
const BEM_CLASS_AVATAR__IMAGE = avatarBem('image');
const BEM_CLASS_AVATAR__INITIALS = avatarBem('initials');

export const AvatarFC: FC<FunctionalComponentProps<AvatarApi>> = (props) => {
	const { color, initials, label, src } = resolveFcProps(avatarPropsConfig, props);

	return (
		<BemRootNodeFC
			aria-label={translate('kol-avatar-alt', { placeholders: { name: trimLabel(label) } })}
			block="kol-avatar"
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
		</BemRootNodeFC>
	);
};
