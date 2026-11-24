import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../../../../internals/src/controller/generic-types';
import { headingPropsConfig, type HeadingApi } from '../../../../internals/src/controller/heading/api';
import { resolveFcProps } from '../../../../internals/src/controller/props-from-config';
import type { HeadingLevel } from '../../../../internals/src/props/index';
import { bem } from '../../../../internals/src/schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import { renderLabelWithLang } from '../span/component';

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
