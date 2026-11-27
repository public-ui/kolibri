import type { FunctionalComponent as FC } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { trimLabel } from '../../../schema';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { TooltipFC } from '../tooltip/component';
import type { AbbrApi } from './api';

type AbbrFCProps = Pick<FunctionalComponentProps<AbbrApi>, 'handleSlotchange' | 'label' | 'refAbbr' | 'refSlot'> & {
	/** Receives the floating tooltip element, managed by the TooltipBehavior. */
	refFloating: (el?: HTMLDivElement) => void;
	/** DOM id of the tooltip content, referenced by the abbreviation's `aria-describedby`. */
	tooltipContentId: string;
};

/**
 * The `abbr` element around the slotted short form. A long form (`label`) adds the floating tooltip as
 * its sibling and makes the abbreviation focusable, so the tooltip is reachable by keyboard.
 */
export const AbbrFC: FC<AbbrFCProps> = ({ handleSlotchange, label, refAbbr, refFloating, refSlot, tooltipContentId }) => {
	const hasLabel = trimLabel(label) !== '';

	return (
		<Fragment>
			<BemRootNodeFC
				block="kol-abbr"
				component="abbr"
				modifiers={{ 'has-label': hasLabel }}
				aria-describedby={hasLabel ? tooltipContentId : undefined}
				ref={refAbbr}
				tabIndex={hasLabel ? 0 : undefined}
			>
				<slot onSlotchange={handleSlotchange} ref={refSlot} />
			</BemRootNodeFC>
			{hasLabel ? <TooltipFC id={tooltipContentId} label={label ?? ''} refFloating={refFloating} /> : null}
		</Fragment>
	);
};
