import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { TooltipFC } from '../tooltip/component';
import type { AbbrApi } from './api';

const abbrBem = bem.forBlock('kol-abbr');

export type AbbrFCProps = FunctionalComponentProps<AbbrApi> & {
	/** ID of the tooltip content, referenced by `aria-describedby` of the abbreviation. */
	tooltipId: string;
	/** Hides the default slot, e.g. because it holds markup instead of text. */
	hideSlot?: boolean;
	onSlotChange?: (event: Event) => void;
	refAbbr?: (element?: HTMLElement) => void;
	refTooltip: (element?: HTMLDivElement) => void;
};

/**
 * The `abbr` element with the abbreviation and, with a long form (`label`), its tooltip.
 *
 * Without `abbr` the deprecated default slot provides the abbreviation. With a long form the
 * abbreviation is focusable, so the tooltip also opens on keyboard focus, and it references the
 * tooltip content as its description. There is no native `title`, which would show a second tooltip.
 */
export const AbbrFC: FC<AbbrFCProps> = ({ abbr, label, tooltipId, hideSlot, onSlotChange, refAbbr, refTooltip }) => {
	const hasLabel = typeof label === 'string' && label.length > 0;

	return (
		<BemRootNodeFC block="kol-abbr" component="span" modifiers={{ 'has-label': hasLabel }}>
			<abbr class={abbrBem('abbr')} ref={refAbbr} tabIndex={hasLabel ? 0 : undefined} aria-describedby={hasLabel ? tooltipId : undefined}>
				{abbr ? (
					abbr
				) : (
					// The slot stays in the DOM while it is hidden, so it reports the next change of its content.
					<span hidden={hideSlot}>
						<slot onSlotchange={onSlotChange} />
					</span>
				)}
			</abbr>
			{hasLabel && (
				<span class={abbrBem('tooltip')}>
					<TooltipFC id={tooltipId} label={label} refFloating={refTooltip} />
				</span>
			)}
		</BemRootNodeFC>
	);
};
