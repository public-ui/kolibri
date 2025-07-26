/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */
import { h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';
import { BEM_CLASS_ICON, BEM_CLASS_ICON__ICON } from '../../components/icon/bem';
import type { InternalIconProps } from '../../schema';

export type IconProps = InternalIconProps & {
	class?: string;
	style?: { [key: string]: string };
	onClick?: (event: MouseEvent) => void;
};

const KolIconFc: FC<IconProps> = (props) => {
	const { class: classNames, style, icons, label, onClick } = props;
	const ariaShow = (label ?? '').length > 0;

	return (
		<i
			aria-hidden={ariaShow ? undefined : 'true'}
			aria-label={ariaShow ? label : undefined}
			class={clsx(BEM_CLASS_ICON, BEM_CLASS_ICON__ICON, icons, classNames)}
			style={style}
			role="img"
			onClick={onClick}
		></i>
	);
};

export default KolIconFc;
