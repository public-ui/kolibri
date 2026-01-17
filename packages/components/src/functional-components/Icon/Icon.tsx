import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { BEM_CLASS_ICON, BEM_CLASS_ICON__ICON } from '../../components/icon/bem';
import type { InternalIconProps } from '../../schema';

export type IconProps = InternalIconProps &
	Omit<JSXBase.HTMLAttributes<HTMLElement>, 'class' | 'style' | 'onClick'> & {
		class?: string;
		style?: { [key: string]: string };
		onClick?: (event: MouseEvent) => void;
	};

const KolIconFc: FC<IconProps> = (props) => {
	const { class: classNames, style, icons, label, onClick, ...other } = props;
	const labelText = label ?? '';
	const hasAriaLabel = labelText.length > 0;

	return (
		<i
			aria-hidden={hasAriaLabel ? undefined : 'true'}
			aria-label={hasAriaLabel ? labelText : undefined}
			class={clsx(BEM_CLASS_ICON, BEM_CLASS_ICON__ICON, icons, classNames)}
			part="icon"
			role={hasAriaLabel ? 'img' : 'presentation'}
			style={style}
			onClick={onClick}
			{...other}
		></i>
	);
};

export default KolIconFc;
