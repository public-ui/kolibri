import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { AbbrApi } from './api';

/**
 * Renders the `abbr` element around the slotted abbreviation and links the long form from the
 * (deprecated) label as the `title` expansion — the native mechanism of `abbr`, so short and
 * long form are both available.
 */
export const AbbrFC: FC<FunctionalComponentProps<AbbrApi>> = ({ label }) => (
	<BemRootNodeFC block="kol-abbr" component="abbr" title={label || undefined}>
		<slot />
	</BemRootNodeFC>
);
