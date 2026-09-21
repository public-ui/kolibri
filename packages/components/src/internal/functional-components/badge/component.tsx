import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import { ButtonFC } from '../button/component';
import type { ResolvedButtonProps } from '../button/resolve-props';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { BadgeApi } from './api';

const badgeBem = bem.forBlock('kol-badge');
const BEM_CLASS_BADGE__LABEL = badgeBem('label');
const BEM_CLASS_BADGE__SMART_BUTTON = badgeBem('smart-button');

/**
 * Everything `BadgeFC` needs for the smart button, as one optional unit: its ids, refs and handlers
 * exist only when a button is configured. A consumer that renders a plain badge — `kol-version` —
 * passes nothing and has no orchestration to invent.
 */
export type BadgeSmartButtonFCProps = Pick<
	FunctionalComponentProps<BadgeApi>,
	'ariaDescriptionId' | 'handleBlur' | 'handleClick' | 'handleFocus' | 'handleMouseDown' | 'labelId' | 'refSmartButton' | 'refTooltip'
> & {
	/** The button props resolved by the web component, spread onto `ButtonFC`. */
	resolvedButton: ResolvedButtonProps;
};

/**
 * `Pick`, not `Omit`: `Omit` over `FunctionalComponentProps` widens every remaining prop, because
 * subtracting from the intersection collapses the precise types into the optional HTML attributes
 * it is intersected with.
 */
type BadgeFCProps = Pick<FunctionalComponentProps<BadgeApi>, 'color' | 'icons' | 'label'> & {
	smartButton?: BadgeSmartButtonFCProps;
};

/**
 * Root from `bem.forBlock('kol-badge')`, not `BemRootNodeFC`: the badge needs an inline `style`
 * for its colours, and `BemRootNodeFC` forwards only `class` (ARC42 § "BemRootNodeFC Pattern").
 *
 * The trailing `<br />` makes NVDA's read mode treat each badge as one element. The smart button
 * stays before it in the DOM for tab order and is moved to the end visually by `order: 3`.
 */
export const BadgeFC: FC<BadgeFCProps> = ({ color, icons, label, smartButton }) => {
	return (
		<div
			class={badgeBem({ 'has-smart-button': smartButton !== undefined })}
			style={{
				backgroundColor: color.backgroundColor,
				color: color.foregroundColor,
			}}
		>
			<SpanFC class={BEM_CLASS_BADGE__LABEL} id={smartButton?.labelId} allowMarkdown icons={icons} label={label} />
			{smartButton && (
				<ButtonFC
					{...smartButton.resolvedButton}
					class={BEM_CLASS_BADGE__SMART_BUTTON}
					ariaDescriptionId={smartButton.ariaDescriptionId}
					handleBlur={smartButton.handleBlur}
					handleClick={smartButton.handleClick}
					handleFocus={smartButton.handleFocus}
					handleMouseDown={smartButton.handleMouseDown}
					refButton={smartButton.refSmartButton}
					refTooltip={smartButton.refTooltip}
				/>
			)}

			<br />
		</div>
	);
};
