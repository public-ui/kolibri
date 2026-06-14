import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import type { AbbrApi } from './api';

const abbrBem = bem.forBlock('kol-abbr');
const BEM_CLASS_ABBR = abbrBem();

export const AbbrFC: FC<FunctionalComponentProps<AbbrApi>> = ({ label, refAbbr }) => (
	// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
	<abbr class={BEM_CLASS_ABBR} ref={refAbbr} tabIndex={label ? 0 : undefined}>
		<slot />
	</abbr>
);
