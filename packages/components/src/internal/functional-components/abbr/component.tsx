import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { AbbrApi } from '../../../../internals/src/controller/abbr/api';
import type { FunctionalComponentProps } from '../../../../internals/src/controller/generic-types';
import { BemRootNodeFC } from '../bem-root-node/component';

/**
 * The `abbr` element around the slotted abbreviation. The deprecated `label` is not rendered.
 */
export const AbbrFC: FC<FunctionalComponentProps<AbbrApi>> = () => (
	<BemRootNodeFC block="kol-abbr" component="abbr">
		<slot />
	</BemRootNodeFC>
);
