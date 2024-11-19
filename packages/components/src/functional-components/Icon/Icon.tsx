import { h, type FunctionalComponent as FC } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';
import type { InternalIconProps } from '../../schema';

export type IconProps = InternalIconProps & {
	class?: string;
	style?: { [key: string]: string };
	onClick?: (event: MouseEvent) => void;
};

const KolIconFc: FC<IconProps> = (props) => {
	const { class: classNames, style, icons, label, onClick } = props;

	return <KolIconTag class={classNames} style={style} onClick={onClick} _icons={icons} _label={label} />;
};

export default KolIconFc;
