import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { AbbrApi } from './api';

/**
 * The `abbr` element around the slotted abbreviation. The deprecated `label` is not rendered.
 */
export const AbbrFC: FC<FunctionalComponentProps<AbbrApi>> = () => (
	<BemRootNodeFC block="kol-abbr" component="abbr">
		<slot />
	</BemRootNodeFC>
);
