import { h, type FunctionalComponent as FC } from '@stencil/core';
import { IconFC } from '../../components/_skeleton/internal/functional-components/icon/component';
import type { InternalIconProps } from '../../schema';

export type IconProps = InternalIconProps & {
	class?: string;
	onClick?: (event: MouseEvent) => void;
	style?: { [key: string]: string };
};

const KolIconFc: FC<IconProps> = ({ class: classNames, icons, label, onClick, style }) => (
	<IconFC class={classNames} icons={icons} label={label} onClick={onClick} style={style} />
);

export default KolIconFc;
