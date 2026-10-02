import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { HeadingLevel } from '../../props';
import type { FunctionalComponentProps } from '../generic-types';
import type { HeadingApi } from './api';

const headingBem = bem.forBlock('kol-heading');
const headlineBem = bem.forBlock('kol-headline');

type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong';

function getHeadlineTag(level: HeadingLevel | number): HeadlineTag {
	return level >= 1 && level <= 6 ? (`h${level}` as HeadlineTag) : 'strong';
}

export const HeadingFC: FC<FunctionalComponentProps<HeadingApi>> = (props) => {
	const { label, level, secondaryHeadline } = props;
	const HeadlineTag = getHeadlineTag(level);

	if (!secondaryHeadline) {
		return (
			<HeadlineTag class={clsx(headingBem(), headlineBem({ [HeadlineTag]: true, single: true }))}>
				{label}
				<slot name="expert" slot="expert" />
			</HeadlineTag>
		);
	}

	return (
		<hgroup class={headingBem({ group: true })}>
			<HeadlineTag class={headlineBem({ [HeadlineTag]: true, group: true, primary: true })}>
				{label}
				<slot name="expert" slot="expert" />
			</HeadlineTag>
			<p class={headlineBem({ group: true, secondary: true })}>{secondaryHeadline}</p>
		</hgroup>
	);
};
