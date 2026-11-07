import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { HeadingLevel } from '../../props';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { resolveFcProps } from '../props-from-config';
import { renderLabelWithLang } from '../span/component';
import { headingPropsConfig, type HeadingApi } from './api';

const headlineBem = bem.forBlock('kol-headline');

type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong';

function getHeadlineTag(level: HeadingLevel | number): HeadlineTag {
	return level >= 1 && level <= 6 ? (`h${level}` as HeadlineTag) : 'strong';
}

export const HeadingFC: FC<FunctionalComponentProps<HeadingApi>> = (props) => {
	const { label, level, secondaryHeadline } = resolveFcProps(headingPropsConfig, props);
	const HeadlineTag = getHeadlineTag(level);

	if (!secondaryHeadline) {
		return (
			<BemRootNodeFC component={HeadlineTag} block="kol-heading" class={headlineBem({ [HeadlineTag]: true, single: true })}>
				{renderLabelWithLang(label)}
				<slot name="expert" slot="expert" />
			</BemRootNodeFC>
		);
	}

	return (
		<BemRootNodeFC component="hgroup" block="kol-heading" modifiers={{ group: true }}>
			<HeadlineTag class={headlineBem({ [HeadlineTag]: true, group: true, primary: true })}>
				{renderLabelWithLang(label)}
				<slot name="expert" slot="expert" />
			</HeadlineTag>
			<p class={headlineBem({ group: true, secondary: true })}>{secondaryHeadline}</p>
		</BemRootNodeFC>
	);
};
