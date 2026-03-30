import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import clsx from '../../../utils/clsx';
import type { HeadingLevel } from '../../props';
import type { FunctionalComponentProps } from '../generic-types';
import type { HeadingApi } from './api';

type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong';

function getHeadlineTag(level: HeadingLevel | number): HeadlineTag {
	return level >= 1 && level <= 6 ? (`h${level}` as HeadlineTag) : 'strong';
}

export const HeadingFC: FC<FunctionalComponentProps<HeadingApi>> = (props) => {
	const { label, level, secondaryHeadline } = props;
	const HeadlineTag = getHeadlineTag(level);

	if (!secondaryHeadline) {
		return (
			<HeadlineTag class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, 'kol-headline--single')}>
				{label}
				<slot name="expert" slot="expert" />
			</HeadlineTag>
		);
	}

	return (
		<hgroup class="kol-heading-group">
			<HeadlineTag class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, 'kol-headline--group', 'kol-headline--primary')}>
				{label}
				<slot name="expert" slot="expert" />
			</HeadlineTag>
			<p class="kol-headline kol-headline--group kol-headline--secondary">{secondaryHeadline}</p>
		</hgroup>
	);
};
