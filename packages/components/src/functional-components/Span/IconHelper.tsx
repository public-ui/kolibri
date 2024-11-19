import { h, type FunctionalComponent as FC } from '@stencil/core';
import clsx from 'clsx';

import type { KoliBriCustomIcon } from '../../schema';
import KolIconFc from '../Icon';

const IconHelper: FC<KoliBriCustomIcon & { class?: string }> = (props) => {
	const { class: classNames, style, label, icon } = props;

	return <KolIconFc class={clsx('icon', classNames)} style={style} label={label || ''} icons={icon} />;
};

export default IconHelper;
