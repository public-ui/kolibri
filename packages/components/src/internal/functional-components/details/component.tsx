import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { CollapsibleFC } from '../collapsible/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { DetailsApi } from './api';

/**
 * Renders the details component as a single BEM root via the shared collapsible shell
 * (block, fixed icon and `indented-text` content class are the details-specific parts).
 */
export const DetailsFC: FC<FunctionalComponentProps<DetailsApi>> = (
	{ controlId, disabled, handleToggle, headingId, label, level, open, refHeadingButton },
	children,
) => (
	<CollapsibleFC
		block="kol-details"
		contentClass="indented-text"
		controlId={controlId}
		disabled={disabled}
		handleToggle={handleToggle}
		headingId={headingId}
		icon="kolicon-chevron-right"
		label={label}
		level={level}
		open={open}
		refHeadingButton={refHeadingButton}
	>
		{children}
	</CollapsibleFC>
);
