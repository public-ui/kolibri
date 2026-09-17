import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { CollapsibleFC } from '../collapsible/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { AccordionApi } from './api';

/**
 * Renders the accordion component as a single BEM root via the shared collapsible shell
 * (block and the open-dependent chevron icon are the accordion-specific parts).
 */
export const AccordionFC: FC<FunctionalComponentProps<AccordionApi>> = (
	{ controlId, disabled, handleToggle, headingId, label, level, open, refHeadingButton },
	children,
) => (
	<CollapsibleFC
		block="kol-accordion"
		controlId={controlId}
		disabled={disabled}
		handleToggle={handleToggle}
		headingId={headingId}
		icon={open ? 'kolicon-chevron-down' : 'kolicon-chevron-right'}
		label={label}
		level={level}
		open={open}
		refHeadingButton={refHeadingButton}
	>
		{children}
	</CollapsibleFC>
);
